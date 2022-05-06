import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const feedbackRepositoryFake = { create: createFeedbackSpy};
const mailAdapterFake = { sendMail: sendMailSpy};

const submitFeedback = new SubmitFeedbackUseCase(
  feedbackRepositoryFake,
  mailAdapterFake
);

const INITIAL_STRING_SCREENSHOT = 'data:image/png;base64';

describe('Submit feedback use case', () => {
  it('should be able to submit a feedback', async  () => {
    await expect(submitFeedback.execute({
      type: 'type-fake',
      comment: 'comment-fake',
      screenshot: `${INITIAL_STRING_SCREENSHOT},image-fake.png`
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalledTimes(1);
    expect(sendMailSpy).toHaveBeenCalledTimes(1);
  });

  it('should not be able to submit feedback without type', async  () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'comment-fake',
      screenshot: `${INITIAL_STRING_SCREENSHOT},image-fake.png`
    })).rejects.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalledTimes(0);
    expect(sendMailSpy).toHaveBeenCalledTimes(0);
  });

  it('should not be able to submit feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: 'type-fake',
      comment: '',
      screenshot: `${INITIAL_STRING_SCREENSHOT},image-fake.png`
    })).rejects.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalledTimes(0);
    expect(sendMailSpy).toHaveBeenCalledTimes(0);
  });

  it('should not be able to submit feedback with invalid screenshot', async () => {
    await expect(submitFeedback.execute({
      type: 'type-fake',
      comment: 'comment-fake',
      screenshot: 'invalid-screenshot'
    })).rejects.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalledTimes(0);
    expect(sendMailSpy).toHaveBeenCalledTimes(0);
  });
});