# Harsh & Kashish Wedding Invitation Web App 💍

An exquisite, interactive royal Indian wedding invitation website crafted for **Harsh & Kashish**, modeled after the authentic aesthetic of royal stationery cards with 3D envelope unfolding animations, gold wax seal, interactive scratch-to-reveal card, live countdown, bilingual support (English & Hindi), background music, and event itineraries.

---

## ✨ Features

1. **3D Royal Envelope & Golden Wax Seal**:
   - Opens on tap with authentic 3D flap unfolding, breaking wax seal, and rising invitation card animation.
   - Golden hashtag `#karsh` embossed on the envelope pocket.

2. **Auspicious Hero Card**:
   - Sacred Lord Ganesha illustration with rotating geometric mandala and glowing halo.
   - Sanskrit Shloka: *॥ श्री गणेशाय नमः ॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ...*
   - Regal couple names: **हर्ष और कशिश / Harsh & Kashish**.

3. **Interactive Golden Scratch Card ("Save The Date")**:
   - Metallic golden foil with dynamic particle dust.
   - Interactive scratching using mouse or finger touch.
   - Automatic celebration confetti burst upon scratching 45% or clicking "कार्ड तुरंत खोलें".
   - Reveals wedding date: **बुधवार, 9 दिसंबर 2026 · शाम 7:00 बजे से · बदायूँ**.

4. **Live Countdown Timer**:
   - Real-time countdown ticking down days, hours, minutes, and seconds until the wedding ceremony.

5. **Our Story ("हमारी कहानी · सदा साथ")**:
   - Romantic illustrated polaroid card and heartfelt journey text.

6. **Venues with Google Maps Navigation ("कहाँ · विवाह स्थल")**:
   - Direct one-click Google Maps navigation buttons to Rajmahal Gardens & Family Residence.

7. **Multi-day Festivities Itinerary ("उत्सव का क्रम · शुभ प्रसंग")**:
   - Interactive timeline spanning 5 – 10 December 2026:
     - **Sundar Kand Path** (5 Dec)
     - **Tel / Mandap** (6 Dec)
     - **Mehendi & Sangeet** (8 Dec)
     - **Carnival & Haldi Celebration** (9 Dec, with Dress code: *Light Pink*)
     - **Shubh Baraat** (9 Dec)
     - **Varmaala** (9 Dec)
     - **Saat Vachan / Pheras** (10 Dec, 4:00 AM Bhor)
     - **Vadhu Aagman & Griha Pravesh** (10 Dec, 8:00 AM)

8. **Kids Dancing Section ("चाचू और मामू की शादी की धूम!")**:
   - Animated kids dancing in traditional attire with floating musical notes.

9. **Guest Wishes & Interactive RSVP**:
   - Guests can enter their name, choose attendance status, and write heartfelt blessings.
   - Submissions shower golden celebration confetti and update the live blessings list.
   - One-click **WhatsApp Share** & **Copy Link** buttons.

10. **Bilingual Toggle (हिं / EN)**:
    - Top bar toggle instantly switches every heading, time label, event description, and family member list between Hindi and English.

11. **Background Audio Player**:
    - Plays the festive theme song seamlessly with sound wave animations and play/pause controls.

---

## 🚀 How to Run Locally

```bash
# 1. Install dependencies (already installed)
npm install

# 2. Run local development server
npm run dev

# 3. Or preview production build
npm run preview
```

Open [http://localhost:5173](http://localhost:5173) or [http://localhost:4173](http://localhost:4173) in your browser.

---

## 🎨 How to Customize Details

All wedding content, family names, dates, venues, hashtags, and story lines are centralized in one easy-to-edit file:

📁 **[`src/data/weddingData.js`](file:///e:/Kashish%20Card/src/data/weddingData.js)**

- **Couple Names**: Change `groom` and `bride` in English & Hindi.
- **Date & Time**: Update `weddingDate`, `dateShort`, and `saveTheDate`.
- **Hashtag**: Change `hashtag` (e.g. `#KarshForever`).
- **Events & Timings**: Edit the `events` array with your actual ceremonies and dates.
- **Venues & Google Maps Links**: Update venue names, addresses, and `mapQuery` URLs in `venues`.
- **Family Names**: Update `hosts.welcomedBy` and `hosts.compliments`.

---

## 🌐 How to Deploy to Vercel (1-Click)

To deploy your invitation so everyone can view it online on mobile and desktop:

1. Push this folder to your GitHub repository or use Vercel CLI:
```bash
npm install -g vercel
vercel
```
2. Or import the repository into [Vercel](https://vercel.com) — it will automatically detect Vite and deploy within 30 seconds!
