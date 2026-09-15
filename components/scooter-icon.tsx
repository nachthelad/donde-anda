/** Material Design Icons "two_wheeler", Apache License 2.0. */
export const SCOOTER_ICON_PATH =
  "M20 11c-.18 0-.36.03-.53.05L17.41 9H20V6l-3.72 1.86L13.41 5H9v2h3.59l2 2H11l-4 2-2-2H0v2h4a4 4 0 1 0 4 4l2 2h3l3.49-6.1 1.01 1.01A3.98 3.98 0 0 0 16 15a4 4 0 1 0 4-4ZM4 17a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm16 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z";

type ScooterIconProps = {
  size?: number;
  fill?: string;
};

export function ScooterIcon({ size = 25, fill = "currentColor" }: ScooterIconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width={size} height={size} fill={fill}>
      <path d={SCOOTER_ICON_PATH} />
    </svg>
  );
}
