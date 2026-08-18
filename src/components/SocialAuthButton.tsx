import { Text, TouchableOpacity, View } from "react-native";

type Provider = "google" | "facebook" | "apple";

const PROVIDER_CONFIG: Record<
  Provider,
  { label: string; badgeClassName: string; glyph: string; glyphClassName: string }
> = {
  google: {
    label: "Continue with Google",
    badgeClassName: "bg-background border border-border",
    glyph: "G",
    glyphClassName: "text-[#4285F4] font-bold text-body-lg",
  },
  facebook: {
    label: "Continue with Facebook",
    badgeClassName: "bg-[#1877F2]",
    glyph: "f",
    glyphClassName: "text-background font-bold text-body-lg",
  },
  apple: {
    label: "Continue with Apple",
    badgeClassName: "bg-background",
    glyph: "",
    glyphClassName: "text-text-primary font-bold text-h4",
  },
};

type SocialAuthButtonProps = {
  provider: Provider;
  onPress: () => void;
  disabled?: boolean;
};

export function SocialAuthButton({ provider, onPress, disabled }: SocialAuthButtonProps) {
  const config = PROVIDER_CONFIG[provider];

  return (
    <TouchableOpacity
      className={`button--social ${disabled ? "opacity-50" : ""}`}
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
    >
      <View
        className={`h-6 w-6 items-center justify-center rounded-full ${config.badgeClassName}`}
      >
        <Text className={config.glyphClassName}>{config.glyph}</Text>
      </View>
      <Text className="button--social__label">{config.label}</Text>
    </TouchableOpacity>
  );
}
