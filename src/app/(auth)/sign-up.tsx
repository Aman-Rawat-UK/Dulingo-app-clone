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

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isVerificationVisible, setIsVerificationVisible] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleSignUp = async () => {
    // Basic validation: non-empty and valid email, non-empty password
    let hasError = false;
    if (!EMAIL_REGEX.test(email)) {
      setEmailError("Enter a valid email address");
      hasError = true;
    } else {
      setEmailError(null);
    }

    if (!password || password.trim().length === 0) {
      setPasswordError("Enter a password");
      hasError = true;
    } else {
      setPasswordError(null);
    }

    if (hasError) return;

    // Send the sign-up / request-code request with credentials so the backend
    // can create a pending account or associate the code with the provided
    // credentials. Only show verification modal on success.
    setIsSendingCode(true);
    const result = await requestCode(email, password);
    setIsSendingCode(false);

    if (result.success) {
      setIsVerificationVisible(true);
    } else {
      setEmailError(result.error ?? "Failed to send code");
    }
  };

  // Provider-specific OAuth handlers (wire real implementations later)
  const handleGoogle = async () => {
    // Not implemented yet — do not route or appear successful.
    console.warn("Google OAuth not implemented");
  };

  const handleApple = async () => {
    // Not implemented yet — do not route or appear successful.
    console.warn("Apple Sign In not implemented");
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
              <Text className="heading--h1">Create your account</Text>
              <Text className="body--md mt-2 text-text-secondary">
                Start your language journey today ✨
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

              <View className="input-field flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="input-field__label">Password</Text>
                  <TextInput
                    className="input-field__value"
                    placeholder="••••••••"
                    placeholderTextColor="#6B7280"
                    secureTextEntry={!isPasswordVisible}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={password}
                    onChangeText={(value) => {
                      setPassword(value);
                      setPasswordError(null);
                    }}
                    style={{ padding: 0 }}
                  />
                </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setIsPasswordVisible((prev) => !prev)}
                >
                  <Text className="text-body-lg text-text-secondary">
                    {isPasswordVisible ? "🙈" : "👁"}
                  </Text>
                </TouchableOpacity>
              </View>
              {passwordError ? (
                <Text className="body--sm text-error mt-2">{passwordError}</Text>
              ) : null}
            </View>

            <TouchableOpacity
              className="button--primary mt-6"
              activeOpacity={0.8}
              disabled={isSendingCode}
              onPress={handleSignUp}
            >
              <Text className="button--primary__label">
                {isSendingCode ? "Sending code..." : "Sign Up"}
              </Text>
            </TouchableOpacity>

            <View className="my-6 flex-row items-center gap-3">
              <View className="h-px flex-1 bg-border" />
              <Text className="body--sm">or continue with</Text>
              <View className="h-px flex-1 bg-border" />
            </View>

            <View className="gap-3">
              <SocialAuthButton provider="google" onPress={handleGoogle} disabled />
              <SocialAuthButton provider="apple" onPress={handleApple} disabled />
            </View>

            <View className="mt-auto flex-row items-center justify-center pt-6">
              <Text className="body--md text-text-secondary">
                Already have an account?{" "}
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => router.push("/(auth)/sign-in")}
              >
                <Text className="body--md font-semibold text-primary-purple">
                  Log in
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
