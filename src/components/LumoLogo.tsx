import logoAsset from "@/assets/lumo-profile-picture.png.asset.json";

export function LumoLogo({
  className = "size-10",
  showName = false,
}: {
  className?: string;
  showName?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <img src={logoAsset.url} alt="Lumo logo" className={`${className} shrink-0 object-contain`} />
      {showName ? <span className="font-display text-base font-bold text-foreground">Lumo</span> : null}
    </span>
  );
}