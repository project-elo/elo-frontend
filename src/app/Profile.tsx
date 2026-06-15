import { StyleSheet, Text, View } from "react-native";
import { useRef, useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { colors, fontSizes } from "../utils/styles";
import { listToOptions } from "../utils/utils";
import TabContainer from "../components/tabs/TabContainer";
import FormContainer from "../components/form/FormContainer";
import SolidInput from "../components/solidUI/SolidInput";
import SolidToggle from "../components/solidUI/SolidToggle";
import SolidToggleGroup from "../components/solidUI/SolidToggleGroup";
import SolidSlider from "../components/solidUI/SolidSlider";
import SolidButton from "../components/solidUI/SolidButton";
import SolidTile from "../components/solidUI/Form/SolidTile";
import SolidDropDownMenu from "../components/solidUI/SolidDropDown";

export default function Profile() {
  // Profile
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState(66);
  const [interests, setInterests] = useState<string[]>([]);
  const [intent, setIntent] = useState("");
  const [intentOpen, setIntentOpen] = useState(false);
  const intentTileRef = useRef<View>(null);
  const intentOptions = listToOptions([
    "Something casual",
    "A relationship",
    "Not sure yet",
  ]);
  const selectedIntent = intentOptions.find((o) => o.value === intent);

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
    <TabContainer>
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

        <SolidTile
          isFirst
          isLast
          label="Looking For"
          onPress={() => setIntentOpen((o) => !o)}
        >
          <View
            ref={intentTileRef}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Text style={{ fontSize: fontSizes.small, color: colors.theme }}>
              {selectedIntent?.label ?? "Select"}
            </Text>
            <Entypo
              style={{
                marginTop: 4,
                fontSize: fontSizes.text - 4,
                color: colors.theme,
              }}
              name="select-arrows"
            />
          </View>
        </SolidTile>
        <SolidDropDownMenu
          isVisible={intentOpen}
          setOpen={setIntentOpen}
          fromRef={intentTileRef}
          options={intentOptions}
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
    </TabContainer>
  );
}

const styles = StyleSheet.create({
  section: {
    fontSize: 22,
    fontWeight: "600",
    color: colors.gray,
    marginBottom: 8,
    marginTop: 16,
  },
});
