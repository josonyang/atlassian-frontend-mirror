import { telepointerCallback, telepointerFromStep } from '../telepointers-helper';
import { ExperiencePerformanceTypes, ExperienceTypes, UFOExperience } from '@atlaskit/ufo';
import { AcknowledgementResponseTypes } from '../../types';
import type { ProviderParticipant, StepJson } from '@atlaskit/editor-common/collab';
import type { InternalError } from '../../errors/internal-errors';

jest.mock('@atlaskit/ufo');

describe('telepointerCallback', () => {
	const startMock = jest.spyOn(UFOExperience.prototype, 'start');
	const successMock = jest.spyOn(UFOExperience.prototype, 'success');
	const failureMock = jest.spyOn(UFOExperience.prototype, 'failure');
	const abortMock = jest.spyOn(UFOExperience.prototype, 'abort');
	const metadataMock = jest.spyOn(UFOExperience.prototype, 'addMetadata');
	const documentAri = '69';
	const ackCallback = telepointerCallback(documentAri);

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should create a new ufo experience', () => {
		telepointerCallback(documentAri);
		expect(UFOExperience).toHaveBeenCalledWith('collab-provider.telepointer', {
			type: ExperienceTypes.Operation,
			performanceType: ExperiencePerformanceTypes.Custom,
			performanceConfig: {
				histogram: {
					[ExperiencePerformanceTypes.Custom]: {
						duration: '250_500_1000_1500_2000_3000_4000',
					},
				},
			},
		});
	});

	it('should start experience with ufo', () => {
		telepointerCallback(documentAri);
		expect(startMock).toHaveBeenCalledTimes(1);
	});

	it('should add the documentAri as metadata', () => {
		telepointerCallback(documentAri);
		expect(metadataMock).toHaveBeenCalledWith({
			documentAri: documentAri,
		});
	});

	it('should finish experience with ufo on success', () => {
		ackCallback({
			type: AcknowledgementResponseTypes.SUCCESS,
		});
		expect(successMock).toHaveBeenCalledTimes(1);
		expect(failureMock).not.toHaveBeenCalled();
		expect(abortMock).not.toHaveBeenCalled();
	});

	it('should finish experience with ufo on error', () => {
		ackCallback({
			type: AcknowledgementResponseTypes.ERROR,
			error: {
				message: 'Oh no we did a oopsie whoospie',
			} as InternalError,
		});
		expect(metadataMock).toHaveBeenCalledWith({
			error: {
				message: 'Oh no we did a oopsie whoospie',
			},
		});
		expect(successMock).not.toHaveBeenCalled();
		expect(failureMock).toHaveBeenCalledTimes(1);
		expect(abortMock).not.toHaveBeenCalled();
	});

	it('should finish experience with ufo on abort', () => {
		ackCallback({
			//@ts-ignore we're breaking this on purpose
			type: 'herpaderp',
		});
		expect(successMock).not.toHaveBeenCalled();
		expect(failureMock).toHaveBeenCalledTimes(1);
		expect(abortMock).not.toHaveBeenCalled();
	});
});

describe('telepointerFromStep', () => {
	const sessionId = '666';
	const clientId = '420';
	const to = 69;
	const yaBoi: ProviderParticipant = {
		userId: '69',
		clientId: clientId,
		sessionId: sessionId,
		lastActive: 1999,
		name: 'Ya Boi',
		avatar: 'www.thelastairbender.com/image.png',
		email: 'fake.user@email.com',
	};
	const participants: ProviderParticipant[] = [yaBoi];
	const stepWithoutFrom: any = {
		to,
		stepType: 'replace',
		clientId: clientId,
		userId: '6198',
		createdAt: 0,
		structure: false,
		slice: {
			content: [
				{
					type: 'text',
					text: {
						length: 1,
					},
					length: 1,
				},
			],
		},
	};

	it('calculates correct telepointer when given valid step', () => {
		const validFrom = 69;
		const validStep: StepJson = { ...stepWithoutFrom, from: validFrom };

		const response = telepointerFromStep(participants, validStep);

		expect(response).toEqual({
			sessionId,
			selection: {
				type: 'textSelection',
				anchor: validFrom + 1,
				head: to + 1,
			},
			type: 'telepointer',
		});
	});

	it('returns undefined when given invalid step', () => {
		const invalidFrom = 68;
		const invalidStep: StepJson = { ...stepWithoutFrom, from: invalidFrom };

		const response = telepointerFromStep(participants, invalidStep);

		expect(response).toBeUndefined();
	});

	it('returns undefined when given no steps', () => {
		const response = telepointerFromStep(participants, {} as any);

		expect(response).toBeUndefined();
	});
});
