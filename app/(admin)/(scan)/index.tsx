import { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { BarcodeScanningResult, CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Scan = () => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    // Hide the tab bar when this screen is focused
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: 'none' }
    });

    // Restore tab bar when component unmounts
    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: { 
          backgroundColor: '#2A3335',
          height: 60,
          paddingBottom: 10,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }
      });
    };
  }, [navigation]);

  const toggleCameraFacing = () => {
    setFacing(current => (current === "back" ? "front" : "back"));
  };

  const barcodeScannedHandler = (result: BarcodeScanningResult) => {
    console.log(result.data);
  }

  // Camera permissions not granted
  if (!permission) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  // Camera permissions granted
  return (
    <View style={{ 
      flex: 1,
    }}>
      <CameraView
        style={{ 
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        }}
        facing={facing}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={barcodeScannedHandler}
      >

        {/* Back button */}
        <View
          style={{
            position: "absolute",
            top: 10, bottom: 0, left: 10, right: 0
          }}
        >
          <Pressable
            onPress={() => router.back() }
          >
            <FontAwesome name="arrow-left" size={30} color="white" />
          </Pressable>
        </View>

        {/* Scan QR frame */}
        <View
          style={{
            borderWidth: 5,
            borderRadius: 25,
            borderColor: "white",
            position: "absolute",
            top: "40%", bottom: 0, left: "25%", right: 0,
            width: "50%", height: "25%",
          }}
        >
        </View>
      </CameraView>
    </View>
  );
};

export default Scan;