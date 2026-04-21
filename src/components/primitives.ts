import { tv } from "tailwind-variants";

export const title = tv({
  base: "tracking-tight inline font-signature text-primary-text",
  variants: {
    color: {
      violet: "from-[#5e6ad2] to-[#7170ff]",
      foreground: "from-[#f7f8f8] to-[#d0d6e0]",
    },
    size: {
      sm: "text-3xl lg:text-4xl",
      md: "text-[2.3rem] lg:text-5xl",
      lg: "text-4xl lg:text-6xl",
    },
    fullWidth: {
      true: "w-full block",
    },
  },
  defaultVariants: {
    size: "md",
  },
  compoundVariants: [
    {
      color: ["violet", "foreground"],
      class: "bg-clip-text text-transparent bg-linear-to-b",
    },
  ],
});

export const subtitle = tv({
  base: "w-full md:w-1/2 my-2 text-base lg:text-lg text-tertiary-text block max-w-full font-regular tracking-tight",
  variants: {
    fullWidth: {
      true: "w-full!",
    },
  },
  defaultVariants: {
    fullWidth: true,
  },
});
