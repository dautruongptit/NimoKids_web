import { copy } from '../../content/copy';

type ErrorNoticeProps = {
  message: string;
  onRetry: () => void;
};

/** Friendly, non-technical message with a retry button. Shown whenever an API call fails. */
export default function ErrorNotice({ message, onRetry }: ErrorNoticeProps) {
  return <div className="error-notice" role="alert">
    <span>{message}</span>
    <button className="error-retry" onClick={onRetry}>{copy.errors.retry}</button>
  </div>;
}
