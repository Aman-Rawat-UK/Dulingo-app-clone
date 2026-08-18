import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Demo() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView contentContainerStyle={{ padding: 24, gap: 16 }}>
        <Text className="heading--h1">lingua</Text>
        <Text className="heading--h2">Section Title</Text>
        <Text className="heading--h3">Card / Module Title</Text>
        <Text className="heading--h4">Subheading</Text>
        <Text className="body--lg">Body Large — important content</Text>
        <Text className="body--md">Body Medium — body text</Text>
        <Text className="body--sm">Body Small — supporting text</Text>
        <Text className="caption">CAPTION — LABELS, META TEXT</Text>

        <View className="card gap-2">
          <Text className="heading--h3">Design System Card</Text>
          <Text className="body--md">
            Rounded corners, soft border, and surface background straight from
            the theme tokens.
          </Text>
        </View>

        <View className="flex-row flex-wrap gap-2">
          <View className="h-12 w-12 rounded-lg bg-primary-purple" />
          <View className="h-12 w-12 rounded-lg bg-primary-deep-purple" />
          <View className="h-12 w-12 rounded-lg bg-primary-blue" />
          <View className="h-12 w-12 rounded-lg bg-primary-green" />
          <View className="h-12 w-12 rounded-lg bg-warning" />
          <View className="h-12 w-12 rounded-lg bg-streak" />
          <View className="h-12 w-12 rounded-lg bg-error" />
        </View>

        <TouchableOpacity className="button--primary" activeOpacity={0.8}>
          <Text className="button--primary__label">Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
