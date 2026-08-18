import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { SocialAuthButton } from "@/components/SocialAuthButton";
import { VerificationModal } from "@/components/VerificationModal";
import { images } from "@/constants/images";
import { requestCode } from "@/lib/auth";

  

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [isVerificationVisible, setIsVerificationVisible] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleSignIn = async () => {
    if (!EMAIL_REGEX.test(email)) {
      setEmailError("Enter a valid email address");
      return;
    }

    setEmailError(null);
    setIsSendingCode(true);
    const result = await requestCode(email);
    setIsSendingCode(false);

    if (result.success) {
      setIsVerificationVisible(true);
    } else {
      setEmailError(result.error ?? "Failed to send code");
    }
  };

  // Provider-specific OAuth handlers (wire real implementations later)
  const handleGoogle = async () => {
    // TODO: implement Google OAuth flow; placeholder navigates home
    router.replace("/");
  };

  const handleApple = async () => {
    // TODO: implement Apple Sign In flow; placeholder navigates home
    router.replace("/");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 px-6 pb-6">
            <TouchableOpacity
              className="mt-4 h-8 w-8 items-center justify-center"
              activeOpacity={0.7}
              onPress={() => router.back()}
            >
              <Text className="text-h3 text-text-primary">‹</Text>
            </TouchableOpacity>

            <View className="mt-6">
              <Text className="heading--h1">Welcome back</Text>
              <Text className="body--md mt-2 text-text-secondary">
                Continue your language journey ✨
              </Text>
            </View>

            <View className="mt-6 items-center">
              <View className="w-full items-center">
                <View
                  className="absolute left-6 top-2"
                  style={{ transform: [{ rotate: "-10deg" }] }}
                >
                  <Text className="text-h3 text-primary-purple">✦</Text>
                </View>
                <View
                  className="absolute right-8 top-8"
                  style={{ transform: [{ rotate: "10deg" }] }}
                >
                  <Text className="text-h4 text-primary-blue">✦</Text>
                </View>
                <View
                  className="absolute right-2 top-24"
                  style={{ transform: [{ rotate: "-10deg" }] }}
                >
                  <Text className="text-h4 text-warning">✦</Text>
                </View>

                <Image
                  source={images.mascotAuth}
                  style={{ width: 200, height: 200, resizeMode: "contain" }}
                />
              </View>
            </View>

            <View className="mt-2 gap-4">
              <View className="input-field">
                <Text className="input-field__label">Email</Text>
                <TextInput
                  className="input-field__value"
                  placeholder="alex@gmail.com"
                  placeholderTextColor="#6B7280"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  value={email}
                  onChangeText={(value) => {
                    setEmail(value);
                    setEmailError(null);
                  }}
                  style={{ padding: 0 }}
                />
              </View>
              {emailError ? (
                <Text className="body--sm text-error">{emailError}</Text>
              ) : null}
            </View>

            <TouchableOpacity
              className="button--primary mt-6"
              activeOpacity={0.8}
              disabled={isSendingCode}
              onPress={handleSignIn}
            >
              <Text className="button--primary__label">
                {isSendingCode ? "Sending code..." : "Sign In"}
              </Text>
            </TouchableOpacity>

            <View className="my-6 flex-row items-center gap-3">
              <View className="h-px flex-1 bg-border" />
              <Text className="body--sm">or continue with</Text>
              <View className="h-px flex-1 bg-border" />
            </View>

            <View className="gap-3">
              <SocialAuthButton provider="google" onPress={handleGoogle} />
              <SocialAuthButton provider="apple" onPress={handleApple} />
            </View>

            <View className="mt-auto flex-row items-center justify-center pt-6">
              <Text className="body--md text-text-secondary">
                Don&apos;t have an account?{" "}
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => router.push("/(auth)/sign-up")}
              >
                <Text className="body--md font-semibold text-primary-purple">
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <VerificationModal
        visible={isVerificationVisible}
        email={email}
        onClose={() => setIsVerificationVisible(false)}
      />
    </SafeAreaView>
  );
}
