<script lang="ts">
    import type { SimpleIcon } from "simple-icons";

    let {
        icon,
        label,
        fallback,
        brandColor = false,
        fallbackColor,
        class: className = "size-4",
    }: {
        icon?: SimpleIcon;
        label: string;
        fallback?: string;
        brandColor?: boolean;
        fallbackColor?: string;
        class?: string;
    } = $props();

    const initials = (value: string) =>
        value
            .split(/\s|\.|\//)
            .filter(Boolean)
            .slice(0, 1)
            .map((part) => part[0])
            .join("")
            .toUpperCase();

    const iconFill = (hex: string, fallback = "currentColor") => {
        const normalized = hex.trim().replace(/^#/, "");
        if (normalized.length !== 6) {
            return fallback;
        }

        const red = Number.parseInt(normalized.slice(0, 2), 16);
        const green = Number.parseInt(normalized.slice(2, 4), 16);
        const blue = Number.parseInt(normalized.slice(4, 6), 16);

        if ([red, green, blue].some((channel) => Number.isNaN(channel))) {
            return fallback;
        }

        const luminance = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;

        return luminance < 0.35 ? fallback : `#${normalized}`;
    };
</script>

{#if icon}
    <svg
        class={`${className} shrink-0`}
        viewBox="0 0 24 24"
        role="img"
        aria-label={label}
    >
        <path
            fill={brandColor ? iconFill(icon.hex) : "currentColor"}
            d={icon.path}
        ></path>
    </svg>
{:else}
    <span
        class={`${className} grid shrink-0 place-items-center rounded-[4px] border border-current text-[9px] font-black leading-none ${fallbackColor ? "text-white" : "text-current opacity-90"}`}
        style={fallbackColor
            ? `background: ${fallbackColor}; border-color: ${fallbackColor}`
            : undefined}
        aria-label={label}
    >
        {fallback ?? initials(label)}
    </span>
{/if}
