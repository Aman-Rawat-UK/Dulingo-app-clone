import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";

export default function Onboarding() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View className="flex-1 px-6 pb-6">
        <View>
          <View className="mt-4 flex-row items-center justify-center gap-2">
            <Image
              source={images.mascotLogo}
              style={{ width: 64, height: 64, resizeMode: "contain" }}
            />
            <Text className="font-bold text-h1 text-text-primary">
              lingua
            </Text>
          </View>

          <View className="mt-10">
            <Text className="font-bold text-h1 text-text-primary">
              Your AI language
            </Text>
            <Text className="font-bold text-h1 text-primary-purple">
              teacher.
            </Text>
            <Text className="body--md mt-3">
              Real conversations, personalized lessons, anytime, anywhere.
            </Text>
          </View>

          <View className="mt-10 items-center">
            <View className="w-full items-center">
              <View
                className="absolute left-0 top-6 rounded-2xl bg-surface px-4 py-2"
                style={{ transform: [{ rotate: "-15deg" }] }}
              >
                <Text className="body--md">Hello!</Text>
              </View>
              <View
                className="absolute right-2 top-0 rounded-2xl bg-surface px-4 py-2"
                style={{ transform: [{ rotate: "15deg" }] }}
              >
                <Text className="body--md text-primary-deep-purple">
                  ¡Hola!
                </Text>
              </View>
              <View
                className="absolute right-0 top-16 rounded-2xl bg-red-50 px-4 py-2"
                style={{ transform: [{ rotate: "-15deg" }] }}
              >
                <Text className="body--md text-error">你好!</Text>
              </View>

              <Image
                source={images.mascotWelcome}
                style={{ width: 320, height: 320, resizeMode: "contain" }}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity
          className="button--primary mt-auto flex-row items-center justify-center"
          activeOpacity={0.8}
        >
          <Text className="button--primary__label">Get Started</Text>
          <Text className="button--primary__label absolute right-6">›</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
