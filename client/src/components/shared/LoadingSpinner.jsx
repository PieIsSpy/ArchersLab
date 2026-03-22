export function LoadingSpinner({ fullscreen = false, message = "Loading..." }) {
  if (fullscreen)
    return <div className="flex h-screen items-center justify-center">{message}</div>;
  return <div className="mx-auto">{message}</div>;
}
