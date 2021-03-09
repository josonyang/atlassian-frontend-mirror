import {
  getExampleUrl,
  loadExampleUrl,
  takeElementScreenShot,
} from '@atlaskit/visual-regression/helper';

const createRepoBtn = '#create-repo-button';
const signupPasswordLabel = '[data-ds--text-field--container="true"]';
const signupPasswordField = 'input[type="password"]';
const signUpPassword = 'form > div:nth-of-type(2)';
const submissionValidationUsername = '[name="username"]';
const submissionValidationEmail = '[name="email"]';
const submitBtn = 'button[type="submit"]';
const submissionValidationError = '[data-testid="userSubmissionError"]';

//TODO: Will be unskipped in Master soon.
describe.skip('Snapshot Test', () => {
  it('Create repository should match production example', async () => {
    const url = getExampleUrl(
      'design-system',
      'form',
      'create-repository',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadExampleUrl(page, url);
    await page.waitForSelector(createRepoBtn);
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });

  it.skip('Signup Form password field validations should match production example', async () => {
    const url = getExampleUrl(
      'design-system',
      'form',
      'signup-form',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadExampleUrl(page, url);

    await page.waitForSelector(signupPasswordLabel);
    await page.waitForSelector(signupPasswordField);
    await page.focus(signupPasswordField);
    await page.keyboard.type('jane');
    await page.waitForSelector(signUpPassword);
    const image = await takeElementScreenShot(page, signUpPassword);
    expect(image).toMatchProdImageSnapshot();
  });

  it('Submission validation should match production example', async () => {
    const url = getExampleUrl(
      'design-system',
      'form',
      'submission-validation',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadExampleUrl(page, url);
    await page.waitForSelector(submissionValidationUsername);
    await page.focus(submissionValidationUsername);
    await page.keyboard.type('jsmith');
    await page.focus(submissionValidationEmail);
    await page.keyboard.type('jsmith@abc.com');
    await page.click(submitBtn);
    await page.waitFor(2000);
    const image = await takeElementScreenShot(page, submissionValidationError);
    expect(image).toMatchProdImageSnapshot();
  });
});
