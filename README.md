# GST Calculator — React Native

A production-ready React Native app for calculating GST (Goods & Services Tax) for India.

## Features
- Add GST to base amount (exclusive) or extract from total (inclusive)
- All standard slabs: 5%, 12%, 18%, 28%
- CGST + SGST breakdown
- Quantity multiplier
- Category presets
- 100% offline

---

## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | ≥ 18 |
| Java JDK | 17 |
| Android Studio | Hedgehog or newer |
| React Native CLI | latest |

Install React Native CLI globally:
```bash
npm install -g react-native-cli
```

---

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Link native modules (React Native ≥ 0.60 auto-links, but run this to be safe)
cd android && ./gradlew clean && cd ..

# 3. Start Metro bundler
npm start

# 4. Run on Android (with device/emulator connected)
npm run android
```

---

## Building for Google Play

### Step 1 — Generate a release keystore (one-time only)
```bash
keytool -genkeypair -v \
  -keystore android/app/release.keystore \
  -alias gstcalculator \
  -keyalg RSA -keysize 2048 -validity 10000
```

### Step 2 — Set environment variables
```bash
export KEYSTORE_PATH=release.keystore
export KEYSTORE_PASSWORD=your_store_password
export KEY_ALIAS=gstcalculator
export KEY_PASSWORD=your_key_password
```

### Step 3 — Build the release AAB
```bash
cd android
./gradlew bundleRelease
```
Output: `android/app/build/outputs/bundle/release/app-release.aab`

### Step 4 — Upload to Google Play Console
1. Visit https://play.google.com/console
2. Create app → Upload AAB
3. Use copy from `STORE_LISTING.md` for the store listing
4. Submit for review

---

## Project Structure

```
GSTCalculator/
├── App.js                        # Entry point
├── src/
│   └── GSTCalculatorScreen.js    # Main screen
├── android/
│   └── app/
│       └── build.gradle          # Android build config
├── package.json
├── STORE_LISTING.md              # Play Store copy + privacy policy
└── README.md
```

---

## Dependencies

- `react-native` 0.76.5
- `react-native-linear-gradient` — gradient backgrounds

---

## Notes

- CGST + SGST split applies to **intrastate** transactions
- For **interstate** transactions, IGST = total GST (same amount, single line item)
- No internet permission required — fully offline
