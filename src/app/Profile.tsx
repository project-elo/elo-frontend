import { StyleSheet, ScrollView, Text } from "react-native";
import { useState } from "react";
import { colors } from "../utils/styles";
import { listToOptions } from "../utils/utils";
import FormContainer from "../components/form/FormContainer";
import SolidInput from "../components/solidUI/SolidInput";
import SolidToggle from "../components/solidUI/SolidToggle";
import SolidToggleGroup from "../components/solidUI/SolidToggleGroup";
import SolidSlider from "../components/solidUI/SolidSlider";
import SolidButton from "../components/solidUI/SolidButton";
import SolidDropDown from "../components/solidUI/SolidDropDown";

export default function Profile() {
  // Profile
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState(66);
  const [interests, setInterests] = useState<string[]>([]);
  const [intent, setIntent] = useState("");

  // Discovery
  const [showMeAs, setShowMeAs] = useState("");
  const [showMeTo, setShowMeTo] = useState<string[]>([]);
  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(35);
  const [maxDist, setMaxDist] = useState(25);

  // Settings
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [likesNotifications, setLikesNotifications] = useState(true);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Profile */}
      <Text style={styles.section}>Profile</Text>
      <FormContainer>
        <SolidInput placeholder="Name" onChangeText={setName} />
        <SolidInput placeholder="Bio" onChangeText={setBio} />
        <SolidToggleGroup
          title="Gender Identity"
          options={listToOptions(["Man", "Woman", "Non-binary"])}
          value={gender}
          setValue={(v) => setGender(v as string)}
        />
        <SolidSlider
          value={height}
          onChange={setHeight}
          min={48}
          max={96}
          unit="feet"
        />

        <SolidDropDown
          title="Looking For"
          options={listToOptions([
            "Something casual",
            "A relationship",
            "Not sure yet",
          ])}
          value={intent}
          setValue={(v) => setIntent(v as string)}
        />
      </FormContainer>

      {/* Discovery */}
      <Text style={styles.section}>Discovery</Text>
      <FormContainer>
        <SolidToggleGroup
          title="Show Me To"
          options={listToOptions(["Men", "Women", "Non-binary"])}
          value={showMeTo}
          setValue={(v) => setShowMeTo(v as string[])}
        />
        <SolidSlider
          value={minAge}
          onChange={setMinAge}
          value2={maxAge}
          onChange2={setMaxAge}
          min={18}
          max={100}
          unit="years"
        />
        <SolidSlider
          value={maxDist}
          onChange={setMaxDist}
          min={1}
          max={100}
          unit="mi"
        />
      </FormContainer>

      {/* Settings */}
      <Text style={styles.section}>Settings</Text>
      <FormContainer>
        <SolidInput placeholder="Email" onChangeText={() => {}} />
        <SolidButton
          onPress={() => {}}
          child={<Text>Change Password</Text>}
          width={200}
          height={44}
        />
        <SolidToggle
          value={notificationsEnabled}
          onChange={setNotificationsEnabled}
        />
        <SolidToggle
          value={likesNotifications}
          onChange={setLikesNotifications}
        />
        <SolidButton
          onPress={() => {}}
          child={<Text>Sign Out</Text>}
          width={200}
          height={44}
        />
        <SolidButton
          onPress={() => {}}
          child={<Text style={{ color: "red" }}>Delete Account</Text>}
          width={200}
          height={44}
        />
      </FormContainer>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafe",
  },
  content: {
    padding: 20,
    paddingTop: 60,
    gap: 0,
  },
  section: {
    fontSize: 22,
    fontWeight: "600",
    color: colors.gray,
    marginBottom: 8,
    marginTop: 16,
  },
});
