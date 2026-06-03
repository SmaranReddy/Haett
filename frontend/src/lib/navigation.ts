type NavigateFn = (to: string, options?: { replace?: boolean }) => void;

let navigateFn: NavigateFn | null = null;

export function setNavigate(fn: NavigateFn): void {
  navigateFn = fn;
}

export function redirect(to: string): void {
  if (navigateFn) {
    navigateFn(to, { replace: true });
  }
}
