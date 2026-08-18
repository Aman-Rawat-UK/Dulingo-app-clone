import { resendCode, verifyCode } from "@/lib/auth";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const CODE_LENGTH = 6;

type VerificationModalProps = {
  visible: boolean;
  email: string;
  onClose: () => void;
};

export function VerificationModal({
  visible,
  email,
  onClose,
}: VerificationModalProps) {
  const router = useRouter();
  const inputRef = useRef<TextInput>(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendStatus, setResendStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChangeCode = async (value: string) => {
    if (loading) return;
    const digitsOnly = value.replace(/[^0-9]/g, "").slice(0, CODE_LENGTH);
    setCode(digitsOnly);
    setError(null);

    if (digitsOnly.length !== CODE_LENGTH) return;

    setLoading(true);
    try {
      const result = await verifyCode(email, digitsOnly);
      if (result.success) {
        setCode("");
        onClose();
        router.replace("/");
      } else {
        setError(result.error ?? "Invalid verification code");
        // keep modal open and allow retry
        setCode("");
        inputRef.current?.focus();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Pressable style={styles.backdrop} onPress={onClose}>
          <Pressable
            className="rounded-t-3xl bg-background px-6 pb-8 pt-6"
            onPress={(e) => e.stopPropagation()}
          >
            <View className="mb-6 items-center">
              <View className="h-1 w-10 rounded-pill bg-border" />
            </View>

            <Text className="heading--h2 text-center">Check your email</Text>
            <Text className="body--md mt-2 text-center text-text-secondary">
              We sent a verification code to{"\n"}
              <Text className="font-medium text-text-primary">{email}</Text>
            </Text>

            <Pressable
              className="mt-8"
              onPress={() => inputRef.current?.focus()}
            >
              <View className="flex-row justify-between">
                {Array.from({ length: CODE_LENGTH }).map((_, index) => {
                  const digit = code[index];
                  const isActive = index === code.length;
                  return (
                    <View
                      key={index}
                      className="input-field h-14 w-12 items-center justify-center py-0"
                      style={isActive ? styles.digitBoxActive : undefined}
                    >
                      <Text className="heading--h3">{digit ?? ""}</Text>
                    </View>
                  );
                })}
              </View>
            </Pressable>

            <TextInput
              ref={inputRef}
              value={code}
              onChangeText={handleChangeCode}
              keyboardType="number-pad"
              maxLength={CODE_LENGTH}
              autoFocus
              style={styles.hiddenInput}
            />

            {error ? (
              <Text className="body--sm mt-4 text-center text-red-500">
                {error}
              </Text>
            ) : null}

            <TouchableOpacity
              className="mt-8"
              activeOpacity={0.7}
              onPress={async () => {
                if (resendStatus === "sending") return;
                setResendStatus("sending");
                setError(null);
                const res = await resendCode(email);
                if (res.success) {
                  setResendStatus("sent");
                  setTimeout(() => setResendStatus("idle"), 3000);
                } else {
                  setResendStatus("error");
                  setError(res.error ?? "Failed to resend code");
                }
              }}
            >
              <Text className="body--md text-center text-primary-purple">
                {resendStatus === "sending"
                  ? "Resending..."
                  : resendStatus === "sent"
                  ? "Sent"
                  : "Didn't receive a code? Resend"}
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(13, 19, 43, 0.4)",
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
    height: 1,
    width: 1,
  },
  digitBoxActive: {
    borderColor: "#6C4EF5",
    borderWidth: 2,
  },
});
