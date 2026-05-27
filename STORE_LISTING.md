# GST Calculator — Google Play Store Listing

---

## App Title (max 50 chars)
GST Calculator India – Tax Tool

## Short Description (max 80 chars)
Fast, accurate GST calculations with CGST/SGST breakdown. Free & offline.

## Full Description (max 4000 chars)

The cleanest GST calculator built for India. Whether you're a business owner, accountant, freelancer, or shopper — get instant tax breakdowns without the clutter.

**Calculate in both directions:**
• Add GST to a base amount (exclusive mode)
• Extract GST from an all-inclusive price (inclusive mode)

**Full tax breakdown at a glance:**
• GST amount at your chosen rate
• CGST + SGST split (intrastate transactions)
• Total payable amount
• Effective tax percentage

**Built for real use:**
• All standard GST slabs — 5%, 12%, 18%, 28%
• Category presets: Groceries, Clothing, Electronics, Luxury
• Quantity multiplier for bulk calculations
• Works 100% offline — no internet needed
• No ads. No account required.

**Who it's for:**
Small business owners filing returns, shopkeepers calculating MRP, procurement teams verifying invoices, or anyone who just wants to know how much tax they're paying.

Simple. Fast. Accurate.

---

## Keywords / Tags
GST calculator, India tax, CGST SGST, GST rate, tax calculator India, goods services tax, invoice GST, GST slab, tax tool India

## Category
Finance

## Content Rating
Everyone

## Target Audience
18+

---

# Privacy Policy

**GST Calculator — Privacy Policy**
Last updated: May 2026

**Data Collection**
GST Calculator does not collect, store, or transmit any personal data. All calculations are performed locally on your device.

**Permissions**
This app requires no device permissions. It does not access your camera, contacts, location, storage, or network.

**Third-Party Services**
This app does not integrate any third-party analytics, advertising SDKs, or tracking services.

**Children's Privacy**
This app does not knowingly collect data from children under 13.

**Contact**
For questions about this privacy policy, contact: [your-email@domain.com]

---

# Release Checklist for Google Play

## Assets needed:
- [ ] App icon: 512×512px PNG (no alpha)
- [ ] Feature graphic: 1024×500px JPG or PNG
- [ ] Screenshots: min 2, max 8 per form factor
      - Phone: 16:9 or 9:16, min 320px, max 3840px
      - Tablet (optional but recommended)
- [ ] Privacy Policy URL (host the policy above somewhere public)

## Play Console setup:
1. Go to https://play.google.com/console
2. Create new app → Android → Free
3. Fill in store listing with copy above
4. Upload signed AAB (from: ./android/gradlew bundleRelease)
5. Set content rating → complete questionnaire → Finance app
6. Set up pricing → Free
7. Select countries → India (+ others as desired)
8. Submit for review (typically 1–3 days)

## Build the signed AAB:
```bash
cd android
./gradlew bundleRelease
# Output: android/app/build/outputs/bundle/release/app-release.aab
```

## Generate a keystore (one-time):
```bash
keytool -genkeypair -v \
  -keystore release.keystore \
  -alias gstcalculator \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```
Store the keystore file and passwords safely — you need them for every future update.
