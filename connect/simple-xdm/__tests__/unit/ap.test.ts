// @ts-nocheck
import Utils from '../../src/common/util';
import AP from '../../src/plugin/ap';

describe('AP', function () {
	let instance = new AP();
	beforeEach(function () {
		instance._data.origin = Utils.locationOrigin();
		instance._data.hostOrigin = Utils.locationOrigin();
		instance._eventHandlers = {};
		instance._data.options = {
			globalOptions: {
				check_init: true,
			},
		};
	});

	it('size is exported', function () {
		expect(instance.size).toEqual(expect.any(Function));
	});

	it('container is exported', function () {
		expect(instance.container).toEqual(expect.any(Function));
	});

	describe('AP._sendInit', function () {
		it('throws if initialization message not received', function () {
			jest.spyOn(window, 'setTimeout').mockImplementation(() => {});
			instance._sendInit(window);
			const timeout = window.setTimeout.mock.calls[window.setTimeout.mock.calls.length - 1][0];
			expect(timeout).toThrow();
		});

		it('does not throw if initialization message received', function () {
			jest.spyOn(window, 'setTimeout').mockImplementation(() => {});
			instance._data.options.globalOptions.check_init = true;
			instance._sendInit(window);
			instance._handleInitReceived();
			const timeout = window.setTimeout.mock.calls[window.setTimeout.mock.calls.length - 1][0];
			expect(timeout).not.toThrow();
		});
	});

	describe('AP._registerOnUnload', function () {
		it('registers a window.onunload event', function () {
			const spy = jest.spyOn(window, 'dispatchEvent');

			function validatorFunction(e) {
				expect(e.data.type).toEqual('unload');
				// eslint-disable-next-line @repo/internal/dom-events/no-unsafe-event-listeners
				instance._host.removeEventListener('message', validatorFunction);
			}
			// eslint-disable-next-line @repo/internal/dom-events/no-unsafe-event-listeners
			instance._host.addEventListener('message', validatorFunction, false);

			if (typeof Event === 'function') {
				window.dispatchEvent(new Event('unload'));
				expect(spy).toHaveBeenCalled();
			} else {
				let testEvent = document.createEvent('Event');
				testEvent.initEvent('unload', false, false);
				window.dispatchEvent(testEvent);
				expect(spy).toHaveBeenCalled();
			}
		});
	});

	describe('AP.resize', function () {
		it('resize called with null width honours height', function () {
			let spy = jest.fn();
			instance._hostModules.env = {
				resize: spy,
			};
			instance.resize(null, 194);
			expect(spy.mock.calls.length).toBe(1);
			expect(spy).toHaveBeenCalledWith('100%', 194);
		});
	});

	describe('AP._handleEvent', function () {
		it('dispatches any', function () {
			let spy = jest.fn();
			instance.registerAny([spy]);
			instance._handleEvent({
				data: {
					etyp: 'abc123',
				},
			});
			expect(spy.mock.calls.length).toBe(1);
		});

		it('dispatches an event', function () {
			let spy = jest.fn();
			instance.register({
				some: spy,
			});
			instance._handleEvent({
				data: {
					etyp: 'some',
				},
			});
			expect(spy.mock.calls.length).toBe(1);
		});

		it('dispatches an event + _any', function () {
			let spy = jest.fn();
			let anySpy = jest.fn();
			instance.registerAny(anySpy);
			instance.register({
				some: spy,
			});
			instance._handleEvent({
				data: {
					etyp: 'some',
				},
			});
			expect(spy.mock.calls.length).toBe(1);
			expect(anySpy.mock.calls.length).toBe(1);
		});

		it.skip('dispatched _any events have event name in _context', function () {
			let spy = jest.fn();
			instance.register({
				some: spy,
			});
			instance._handleEvent({
				data: {
					etyp: 'some',
				},
			});
			let eventName = spy.calls.first()[1]._context.eventName;
			expect(eventName).toEqual('some');
		});

		it('catches exceptions', function () {
			let spy = jest.fn().mockImplementation(() => {
				throw new Error('some error');
			});
			jest.spyOn(Utils, 'error').mockImplementation(() => {});
			instance.register({
				some: spy,
			});
			instance._handleEvent({
				data: {
					etyp: 'some',
				},
			});
			expect(spy).toHaveBeenCalled();
			expect(Utils.error).toHaveBeenCalled();
		});
	});

	describe('AP promises', function () {
		let instance;
		beforeEach(function () {
			instance = new AP();
			instance._data.origin = Utils.locationOrigin();
			instance._data.hostOrigin = Utils.locationOrigin();
			instance._eventHandlers = {};
			let apiData = {
				promiseModule: {
					promiseMethod: {
						args: ['arg'],
						returnsPromise: true,
					},
				},
			};
			instance._setupAPI(apiData);
			instance._setupAPIWithoutRequire(apiData);
			instance._pendingCallbacks = {};
		});

		it('returns a promise', function () {
			let thePromise = instance.promiseModule.promiseMethod();
			expect(thePromise).toBeDefined();
		});
		it('fails a promise on error', function (done) {
			let errorText = 'Error text';
			let thenSpy = jest.fn();
			let thePromise = instance.promiseModule.promiseMethod();
			thePromise.then(thenSpy).catch(function (error) {
				expect(thenSpy).not.toHaveBeenCalled();
				expect(error).toEqual(errorText);
				done();
			});
			instance._handleResponse({
				data: {
					forPlugin: true,
					mid: Object.getOwnPropertyNames(instance._pendingCallbacks)[0],
					args: [errorText, undefined],
				},
			});
		});
		it('resolves promise on success', function (done) {
			let resolveResp = 'Resolve text';
			instance.promiseModule.promiseMethod().then(function (success, error) {
				expect(success).toEqual(resolveResp);
				expect(error).toEqual(undefined);
				done();
			});
			instance._handleResponse({
				data: {
					forPlugin: true,
					mid: Object.getOwnPropertyNames(instance._pendingCallbacks)[0],
					args: [undefined, resolveResp],
				},
			});
		});
		it('fails a promise when both success and error are undefined', function (done) {
			let thenSpy = jest.fn();
			let thePromise = instance.promiseModule.promiseMethod();
			thePromise.then(thenSpy).catch(function () {
				expect(thenSpy).not.toHaveBeenCalled();
				done();
			});

			instance._handleResponse({
				data: {
					forPlugin: true,
					mid: Object.getOwnPropertyNames(instance._pendingCallbacks)[0],
					args: [undefined, undefined],
				},
			});
		});

		it.skip('uses a callback with the correct arguments if user passes a callback', function () {
			let callbackSpy = jest.fn();
			instance.promiseModule.promiseMethod(callbackSpy);

			instance._handleResponse({
				data: {
					forPlugin: true,
					mid: Object.getOwnPropertyNames(instance._pendingCallbacks)[0],
					args: [undefined, 'abc123'],
				},
			});

			expect(callbackSpy).toHaveBeenCalledWith('abc123');
		});
	});

	describe('AP.register', function () {
		it('register is {} by default', function () {
			expect(instance._eventHandlers).toEqual({});
			instance.register();
			expect(instance._eventHandlers).toEqual({});
		});

		it('register sets event callbacks', function () {
			let registrations = {
				event_one: function noop() {},
			};
			instance.register(registrations);
			expect(instance._eventHandlers).toEqual(registrations);
		});

		it('calling register twice merges event callbacks', function () {
			let registration_one = {
				event_one: function noop() {},
			};
			let registration_two = {
				event_two: function noop() {},
			};
			instance.register(registration_one);
			instance.register(registration_two);
			expect(instance._eventHandlers).toEqual({ ...registration_one, ...registration_two });
		});
	});
});
