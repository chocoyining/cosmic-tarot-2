import { useState, useRef } from "react";
import * as Astronomy from "astronomy-engine";

// ── Location Database ─────────────────────────────────────────────────────────
const LOCATION_DB = {
  "Malaysia": {
    dst: false,
    cities: [
      { label: "Johor Bahru",       lat: 1.4927,   lon: 103.7414, tz: 8 },
      { label: "Kuala Lumpur",      lat: 3.1390,   lon: 101.6869, tz: 8 },
      { label: "Petaling Jaya",     lat: 3.1073,   lon: 101.6067, tz: 8 },
      { label: "Shah Alam",         lat: 3.0733,   lon: 101.5185, tz: 8 },
      { label: "Penang",            lat: 5.4141,   lon: 100.3288, tz: 8 },
      { label: "Ipoh",              lat: 4.5975,   lon: 101.0901, tz: 8 },
      { label: "Melaka",            lat: 2.1896,   lon: 102.2501, tz: 8 },
      { label: "Seremban",          lat: 2.7297,   lon: 101.9381, tz: 8 },
      { label: "Kota Kinabalu",     lat: 5.9804,   lon: 116.0735, tz: 8 },
      { label: "Kuching",           lat: 1.5535,   lon: 110.3593, tz: 8 },
      { label: "Miri",              lat: 4.3995,   lon: 113.9914, tz: 8 },
      { label: "Alor Setar",        lat: 6.1248,   lon: 100.3678, tz: 8 },
      { label: "Kota Bharu",        lat: 6.1254,   lon: 102.2380, tz: 8 },
      { label: "Kuala Terengganu",  lat: 5.3302,   lon: 103.1408, tz: 8 },
      { label: "Kuantan",           lat: 3.8077,   lon: 103.3260, tz: 8 },
    ],
  },
  "Singapore": {
    dst: false,
    cities: [{ label: "Singapore", lat: 1.3521, lon: 103.8198, tz: 8 }],
  },
  "Indonesia": {
    dst: false,
    cities: [
      { label: "Jakarta",           lat: -6.2088,  lon: 106.8456, tz: 7 },
      { label: "Surabaya",          lat: -7.2575,  lon: 112.7521, tz: 7 },
      { label: "Bandung",           lat: -6.9175,  lon: 107.6191, tz: 7 },
      { label: "Medan",             lat: 3.5952,   lon: 98.6722,  tz: 7 },
      { label: "Semarang",          lat: -6.9932,  lon: 110.4203, tz: 7 },
      { label: "Makassar",          lat: -5.1477,  lon: 119.4327, tz: 8 },
      { label: "Denpasar (Bali)",   lat: -8.6705,  lon: 115.2126, tz: 8 },
      { label: "Palembang",         lat: -2.9761,  lon: 104.7754, tz: 7 },
      { label: "Yogyakarta",        lat: -7.7956,  lon: 110.3695, tz: 7 },
    ],
  },
  "Philippines": {
    dst: false,
    cities: [
      { label: "Manila",            lat: 14.5995,  lon: 120.9842, tz: 8 },
      { label: "Quezon City",       lat: 14.6760,  lon: 121.0437, tz: 8 },
      { label: "Cebu City",         lat: 10.3157,  lon: 123.8854, tz: 8 },
      { label: "Davao City",        lat: 7.0707,   lon: 125.6087, tz: 8 },
      { label: "Makati",            lat: 14.5547,  lon: 121.0244, tz: 8 },
      { label: "Zamboanga",         lat: 6.9214,   lon: 122.0790, tz: 8 },
    ],
  },
  "Thailand": {
    dst: false,
    cities: [
      { label: "Bangkok",           lat: 13.7563,  lon: 100.5018, tz: 7 },
      { label: "Chiang Mai",        lat: 18.7883,  lon: 98.9853,  tz: 7 },
      { label: "Phuket",            lat: 7.8804,   lon: 98.3923,  tz: 7 },
      { label: "Pattaya",           lat: 12.9236,  lon: 100.8825, tz: 7 },
      { label: "Hat Yai",           lat: 7.0086,   lon: 100.4747, tz: 7 },
    ],
  },
  "Vietnam": {
    dst: false,
    cities: [
      { label: "Ho Chi Minh City",  lat: 10.8231,  lon: 106.6297, tz: 7 },
      { label: "Hanoi",             lat: 21.0285,  lon: 105.8542, tz: 7 },
      { label: "Da Nang",           lat: 16.0544,  lon: 108.2022, tz: 7 },
    ],
  },
  "Myanmar": {
    dst: false,
    cities: [
      { label: "Yangon",            lat: 16.8661,  lon: 96.1951,  tz: 6.5 },
      { label: "Mandalay",          lat: 21.9588,  lon: 96.0891,  tz: 6.5 },
    ],
  },
  "Taiwan": {
    dst: false,
    cities: [
      { label: "Taipei",            lat: 25.0330,  lon: 121.5654, tz: 8 },
      { label: "New Taipei City",   lat: 25.0118,  lon: 121.4628, tz: 8 },
      { label: "Kaohsiung",         lat: 22.6273,  lon: 120.3014, tz: 8 },
      { label: "Taichung",          lat: 24.1477,  lon: 120.6736, tz: 8 },
      { label: "Tainan",            lat: 22.9999,  lon: 120.2269, tz: 8 },
      { label: "Hsinchu",           lat: 24.8138,  lon: 120.9675, tz: 8 },
      { label: "Keelung",           lat: 25.1283,  lon: 121.7419, tz: 8 },
      { label: "Taoyuan",           lat: 24.9936,  lon: 121.3010, tz: 8 },
      { label: "Changhua",          lat: 24.0735,  lon: 120.5162, tz: 8 },
      { label: "Yunlin",            lat: 23.7092,  lon: 120.4313, tz: 8 },
      { label: "Chiayi",            lat: 23.4800,  lon: 120.4491, tz: 8 },
      { label: "Pingtung",          lat: 22.6762,  lon: 120.4914, tz: 8 },
      { label: "Yilan",             lat: 24.7021,  lon: 121.7377, tz: 8 },
      { label: "Hualien",           lat: 23.9871,  lon: 121.6015, tz: 8 },
      { label: "Taitung",           lat: 22.7583,  lon: 121.1444, tz: 8 },
      { label: "Nantou",            lat: 23.9610,  lon: 120.9718, tz: 8 },
      { label: "Miaoli",            lat: 24.5602,  lon: 120.8214, tz: 8 },
      { label: "Penghu",            lat: 23.5711,  lon: 119.5793, tz: 8 },
    ],
  },
  "Hong Kong": {
    dst: false,
    cities: [{ label: "Hong Kong", lat: 22.3193, lon: 114.1694, tz: 8 }],
  },
  "Macau": {
    dst: false,
    cities: [{ label: "Macau", lat: 22.1987, lon: 113.5439, tz: 8 }],
  },
  "China": {
    dst: false,
    cities: [
      { label: "Beijing",           lat: 39.9042,  lon: 116.4074, tz: 8 },
      { label: "Shanghai",          lat: 31.2304,  lon: 121.4737, tz: 8 },
      { label: "Guangzhou",         lat: 23.1291,  lon: 113.2644, tz: 8 },
      { label: "Shenzhen",          lat: 22.5431,  lon: 114.0579, tz: 8 },
      { label: "Chengdu",           lat: 30.5728,  lon: 104.0668, tz: 8 },
      { label: "Hangzhou",          lat: 30.2741,  lon: 120.1551, tz: 8 },
      { label: "Wuhan",             lat: 30.5928,  lon: 114.3055, tz: 8 },
      { label: "Xi'an",             lat: 34.3416,  lon: 108.9398, tz: 8 },
      { label: "Chongqing",         lat: 29.5630,  lon: 106.5516, tz: 8 },
      { label: "Tianjin",           lat: 39.3434,  lon: 117.3616, tz: 8 },
      { label: "Nanjing",           lat: 32.0603,  lon: 118.7969, tz: 8 },
      { label: "Kunming",           lat: 24.8801,  lon: 102.8329, tz: 8 },
      { label: "Qingdao",           lat: 36.0671,  lon: 120.3826, tz: 8 },
      { label: "Shenyang",          lat: 41.8057,  lon: 123.4315, tz: 8 },
      { label: "Harbin",            lat: 45.8038,  lon: 126.5349, tz: 8 },
      { label: "Dalian",            lat: 38.9140,  lon: 121.6147, tz: 8 },
      { label: "Jinan",             lat: 36.6512,  lon: 117.1201, tz: 8 },
      { label: "Zhengzhou",         lat: 34.7466,  lon: 113.6254, tz: 8 },
      { label: "Changsha",          lat: 28.2278,  lon: 112.9388, tz: 8 },
      { label: "Fuzhou",            lat: 26.0745,  lon: 119.2965, tz: 8 },
      { label: "Xiamen",            lat: 24.4798,  lon: 118.0894, tz: 8 },
      { label: "Nanning",           lat: 22.8170,  lon: 108.3665, tz: 8 },
      { label: "Suzhou",            lat: 31.2989,  lon: 120.5853, tz: 8 },
      { label: "Ningbo",            lat: 29.8683,  lon: 121.5440, tz: 8 },
      { label: "Zhuhai",            lat: 22.2710,  lon: 113.5767, tz: 8 },
      { label: "Dongguan",          lat: 23.0207,  lon: 113.7518, tz: 8 },
    ],
  },
  "Japan": {
    dst: false,
    cities: [
      { label: "Tokyo",             lat: 35.6762,  lon: 139.6503, tz: 9 },
      { label: "Osaka",             lat: 34.6937,  lon: 135.5023, tz: 9 },
      { label: "Kyoto",             lat: 35.0116,  lon: 135.7681, tz: 9 },
      { label: "Sapporo",           lat: 43.0618,  lon: 141.3545, tz: 9 },
      { label: "Fukuoka",           lat: 33.5904,  lon: 130.4017, tz: 9 },
      { label: "Nagoya",            lat: 35.1815,  lon: 136.9066, tz: 9 },
    ],
  },
  "South Korea": {
    dst: false,
    cities: [
      { label: "Seoul",             lat: 37.5665,  lon: 126.9780, tz: 9 },
      { label: "Busan",             lat: 35.1796,  lon: 129.0756, tz: 9 },
      { label: "Incheon",           lat: 37.4563,  lon: 126.7052, tz: 9 },
    ],
  },
  "India": {
    dst: false,
    cities: [
      { label: "Mumbai",            lat: 19.0760,  lon: 72.8777,  tz: 5.5 },
      { label: "Delhi",             lat: 28.7041,  lon: 77.1025,  tz: 5.5 },
      { label: "Bangalore",         lat: 12.9716,  lon: 77.5946,  tz: 5.5 },
      { label: "Chennai",           lat: 13.0827,  lon: 80.2707,  tz: 5.5 },
      { label: "Kolkata",           lat: 22.5726,  lon: 88.3639,  tz: 5.5 },
    ],
  },
  "United States": {
    dst: true,
    cities: [
      { label: "New York, NY",        lat: 40.7128,  lon: -74.0060,   tz: -5 },
      { label: "Boston, MA",          lat: 42.3601,  lon: -71.0589,   tz: -5 },
      { label: "Philadelphia, PA",    lat: 39.9526,  lon: -75.1652,   tz: -5 },
      { label: "Washington DC",       lat: 38.9072,  lon: -77.0369,   tz: -5 },
      { label: "Miami, FL",           lat: 25.7617,  lon: -80.1918,   tz: -5 },
      { label: "Orlando, FL",         lat: 28.5383,  lon: -81.3792,   tz: -5 },
      { label: "Atlanta, GA",         lat: 33.7490,  lon: -84.3880,   tz: -5 },
      { label: "Detroit, MI",         lat: 42.3314,  lon: -83.0458,   tz: -5 },
      { label: "Columbus, OH",        lat: 39.9612,  lon: -82.9988,   tz: -5 },
      { label: "Indianapolis, IN",    lat: 39.7684,  lon: -86.1581,   tz: -5 },
      { label: "Chicago, IL",         lat: 41.8781,  lon: -87.6298,   tz: -6 },
      { label: "Houston, TX",         lat: 29.7604,  lon: -95.3698,   tz: -6 },
      { label: "Dallas, TX",          lat: 32.7767,  lon: -96.7970,   tz: -6 },
      { label: "San Antonio, TX",     lat: 29.4241,  lon: -98.4936,   tz: -6 },
      { label: "Austin, TX",          lat: 30.2672,  lon: -97.7431,   tz: -6 },
      { label: "Minneapolis, MN",     lat: 44.9778,  lon: -93.2650,   tz: -6 },
      { label: "Nashville, TN",       lat: 36.1627,  lon: -86.7816,   tz: -6 },
      { label: "New Orleans, LA",     lat: 29.9511,  lon: -90.0715,   tz: -6 },
      { label: "Phoenix, AZ",         lat: 33.4484,  lon: -112.0740,  tz: -7 },
      { label: "Denver, CO",          lat: 39.7392,  lon: -104.9903,  tz: -7 },
      { label: "Salt Lake City, UT",  lat: 40.7608,  lon: -111.8910,  tz: -7 },
      { label: "Los Angeles, CA",     lat: 34.0522,  lon: -118.2437,  tz: -8 },
      { label: "San Francisco, CA",   lat: 37.7749,  lon: -122.4194,  tz: -8 },
      { label: "San Diego, CA",       lat: 32.7157,  lon: -117.1611,  tz: -8 },
      { label: "Seattle, WA",         lat: 47.6062,  lon: -122.3321,  tz: -8 },
      { label: "Portland, OR",        lat: 45.5051,  lon: -122.6750,  tz: -8 },
      { label: "Las Vegas, NV",       lat: 36.1699,  lon: -115.1398,  tz: -8 },
      { label: "Anchorage, AK",       lat: 61.2181,  lon: -149.9003,  tz: -9 },
      { label: "Honolulu, HI",        lat: 21.3069,  lon: -157.8583,  tz: -10 },
    ],
  },
  "Canada": {
    dst: true,
    cities: [
      { label: "Toronto, ON",       lat: 43.6532,  lon: -79.3832,  tz: -5 },
      { label: "Vancouver, BC",     lat: 49.2827,  lon: -123.1207, tz: -8 },
      { label: "Montreal, QC",      lat: 45.5017,  lon: -73.5673,  tz: -5 },
      { label: "Calgary, AB",       lat: 51.0447,  lon: -114.0719, tz: -7 },
      { label: "Ottawa, ON",        lat: 45.4215,  lon: -75.6972,  tz: -5 },
    ],
  },
  "United Kingdom": {
    dst: true,
    cities: [
      { label: "London",            lat: 51.5074,  lon: -0.1278,   tz: 0 },
      { label: "Manchester",        lat: 53.4808,  lon: -2.2426,   tz: 0 },
      { label: "Birmingham",        lat: 52.4862,  lon: -1.8904,   tz: 0 },
      { label: "Edinburgh",         lat: 55.9533,  lon: -3.1883,   tz: 0 },
    ],
  },
  "Australia": {
    dst: true,
    cities: [
      { label: "Sydney, NSW",       lat: -33.8688, lon: 151.2093,  tz: 10 },
      { label: "Melbourne, VIC",    lat: -37.8136, lon: 144.9631,  tz: 10 },
      { label: "Brisbane, QLD",     lat: -27.4698, lon: 153.0251,  tz: 10 },
      { label: "Perth, WA",         lat: -31.9505, lon: 115.8605,  tz: 8 },
      { label: "Adelaide, SA",      lat: -34.9285, lon: 138.6007,  tz: 9.5 },
    ],
  },
  "New Zealand": {
    dst: true,
    cities: [
      { label: "Auckland",          lat: -36.8509, lon: 174.7645,  tz: 12 },
      { label: "Wellington",        lat: -41.2865, lon: 174.7762,  tz: 12 },
    ],
  },
  "Germany": {
    dst: true,
    cities: [
      { label: "Berlin",            lat: 52.5200,  lon: 13.4050,   tz: 1 },
      { label: "Munich",            lat: 48.1351,  lon: 11.5820,   tz: 1 },
      { label: "Frankfurt",         lat: 50.1109,  lon: 8.6821,    tz: 1 },
    ],
  },
  "France": {
    dst: true,
    cities: [
      { label: "Paris",             lat: 48.8566,  lon: 2.3522,    tz: 1 },
      { label: "Lyon",              lat: 45.7640,  lon: 4.8357,    tz: 1 },
    ],
  },
  "UAE": {
    dst: false,
    cities: [
      { label: "Dubai",             lat: 25.2048,  lon: 55.2708,   tz: 4 },
      { label: "Abu Dhabi",         lat: 24.4539,  lon: 54.3773,   tz: 4 },
    ],
  },
  "Saudi Arabia": {
    dst: false,
    cities: [
      { label: "Riyadh",            lat: 24.7136,  lon: 46.6753,   tz: 3 },
      { label: "Jeddah",            lat: 21.3891,  lon: 39.8579,   tz: 3 },
    ],
  },
  "South Africa": {
    dst: false,
    cities: [
      { label: "Johannesburg",      lat: -26.2041, lon: 28.0473,   tz: 2 },
      { label: "Cape Town",         lat: -33.9249, lon: 18.4241,   tz: 2 },
    ],
  },
};

const COUNTRIES = Object.keys(LOCATION_DB).sort();

// ── Zodiac data ───────────────────────────────────────────────────────────────
const SIGNS = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];
const SIGN_GLYPHS = ["♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓"];
const PLANET_GLYPHS = { Sun:"☀️", Moon:"🌙", Rising:"⬆️", Mercury:"☿", Venus:"♀", Mars:"♂", Jupiter:"♃", Saturn:"♄", Uranus:"♅", Neptune:"♆", Pluto:"♇" };
const PLANET_COLORS = { Sun:"#F5C842", Moon:"#B8D4E8", Rising:"#C9A84C", Mercury:"#A8D8A8", Venus:"#F5A0C0", Mars:"#F07070", Jupiter:"#F0C080", Saturn:"#A09070", Uranus:"#80D8D8", Neptune:"#8080F0", Pluto:"#C080C0" };

// ── Astronomy calculation using astronomy-engine ──────────────────────────────
function normalizeEcliptic(lon) { return ((lon % 360) + 360) % 360; }

function eclipticToSign(lon) {
  const n = normalizeEcliptic(lon);
  const idx = Math.floor(n / 30);
  const deg = Math.floor(n % 30);
  const min = Math.floor(((n % 30) - deg) * 60);
  return { sign: SIGNS[idx], signGlyph: SIGN_GLYPHS[idx], degrees: deg, minutes: min };
}

function getEclipticLon(body, date) {
  const vec = Astronomy.HelioVector(body, date);
  // Convert heliocentric to ecliptic longitude
  const ecl = Astronomy.Ecliptic(vec);
  return ecl.elon;
}

function calcAscendant(date, lat, lon) {
  // Use sidereal time + obliquity to compute Ascendant
  const gst = Astronomy.SiderealTime(date);
  const lst = ((gst + lon / 15) % 24 + 24) % 24; // local sidereal time in hours
  const ramc = lst * 15; // RAMC in degrees
  const T = (Astronomy.MakeTime(date).tt - 0) / 36525;
  const obliquity = (23.439291111 - 0.013004167 * T) * Math.PI / 180;
  const r = ramc * Math.PI / 180;
  const latR = lat * Math.PI / 180;
  const asc = Math.atan2(Math.cos(r), -Math.sin(r) * Math.cos(obliquity) - Math.tan(latR) * Math.sin(obliquity)) * 180 / Math.PI;
  return normalizeEcliptic(asc);
}

function getHouse(planetLon, ascLon) {
  const diff = normalizeEcliptic(planetLon - ascLon);
  return (Math.floor(diff / 30) % 12) + 1;
}

function calcChart(year, month, day, hour, minute, tz, lat, lon) {
  // Convert local time to UTC
  const utcHour = hour + minute / 60 - tz;
  const date = new Date(Date.UTC(year, month - 1, day, Math.floor(utcHour), Math.round((utcHour % 1) * 60)));

  const ascLon = calcAscendant(date, lat, lon);

  const bodies = [
    { name: "Sun",     body: Astronomy.Body.Sun },
    { name: "Moon",    body: Astronomy.Body.Moon },
    { name: "Mercury", body: Astronomy.Body.Mercury },
    { name: "Venus",   body: Astronomy.Body.Venus },
    { name: "Mars",    body: Astronomy.Body.Mars },
    { name: "Jupiter", body: Astronomy.Body.Jupiter },
    { name: "Saturn",  body: Astronomy.Body.Saturn },
    { name: "Uranus",  body: Astronomy.Body.Uranus },
    { name: "Neptune", body: Astronomy.Body.Neptune },
    { name: "Pluto",   body: Astronomy.Body.Pluto },
  ];

  const risingInfo = eclipticToSign(ascLon);
  const results = [
    { planet: "Rising", ...risingInfo, house: 1 },
  ];

  for (const { name, body } of bodies) {
    try {
      // Get geocentric ecliptic longitude using GeoVector + Ecliptic
      const geoVec = Astronomy.GeoVector(body, date, true);
      const ecl = Astronomy.Ecliptic(geoVec);
      const lon_deg = normalizeEcliptic(ecl.elon);
      const info = eclipticToSign(lon_deg);
      results.push({ planet: name, ...info, house: getHouse(lon_deg, ascLon) });
    } catch(e) {
      results.push({ planet: name, sign: "?", signGlyph: "?", degrees: 0, minutes: 0, house: 0 });
    }
  }

  return results;
}

function ordinal(n) {
  const s=["th","st","nd","rd"], v=n%100;
  return n+(s[(v-20)%10]||s[v]||s[0]);
}

// ── Styles ────────────────────────────────────────────────────────────────────
const bgStyle = {
  minHeight: "100vh",
  background: "linear-gradient(160deg,#0d0221 0%,#1a0545 40%,#2d0b6b 70%,#0d0221 100%)",
  fontFamily: "'Georgia', serif", color: "#e8d5b7",
  padding: "32px 16px", position: "relative", overflow: "hidden",
};
const inputStyle = {
  background: "#ffffff0d", border: "1px solid #7c5c2e", borderRadius: 8,
  color: "#e8d5b7", padding: "10px 14px", fontSize: 14, width: "100%",
  fontFamily: "'Georgia', serif", outline: "none",
};
const selectStyle = { ...inputStyle, cursor: "pointer" };
function btn(bg) {
  return {
    background: bg, border: "1px solid #7c5c2e", borderRadius: 8,
    color: "#e8d5b7", padding: "13px 0", fontSize: 15, cursor: "pointer",
    letterSpacing: 1, fontFamily: "'Georgia', serif", width: "100%",
  };
}
const Stars = () => (
  <svg style={{ position:"fixed",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:0 }} xmlns="http://www.w3.org/2000/svg">
    {Array.from({length:60},(_,i)=>(
      <circle key={i} cx={`${(i*37.7)%100}%`} cy={`${(i*23.3)%100}%`} r={i%5===0?1.5:1} fill="#fff" opacity={0.3+(i%5)*0.1}/>
    ))}
  </svg>
);
const Label = ({children}) => (
  <div style={{fontSize:11,color:"#a07840",letterSpacing:2,marginBottom:6}}>{children}</div>
);

// ── Main Component ────────────────────────────────────────────────────────────
export default function BirthChart({ onHome }) {
  const [name, setName]       = useState("");
  const [year, setYear]       = useState("");
  const [month, setMonth]     = useState("");
  const [day, setDay]         = useState("");
  const [hour, setHour]       = useState("12");
  const [minute, setMinute]   = useState("0");
  const [country, setCountry] = useState("Malaysia");
  const [cityIdx, setCityIdx] = useState(0);
  const [dst, setDst]         = useState(false);
  const [screen, setScreen]   = useState("form");
  const [chart, setChart]     = useState(null);
  const [error, setError]     = useState("");
  const captureRef            = useRef(null);
  const desktop               = window.innerWidth > 600;



  const countryData = LOCATION_DB[country];
  const cities      = countryData.cities;
  const city        = cities[Math.min(cityIdx, cities.length - 1)];
  const showDst     = countryData.dst;
  const effectiveTz = dst ? city.tz + 1 : city.tz;

  function handleCountryChange(e) {
    setCountry(e.target.value); setCityIdx(0); setDst(false); setChart(null);
  }

  async function saveChart() {
    if (!captureRef.current) return;
    try {
      const canvas = await window.html2canvas(captureRef.current, {
        useCORS:true, allowTaint:true, backgroundColor:"#0d0221", scale:2, width:480, windowWidth:480,
      });
      const filename = `${(name||"my").replace(/\s+/g,"_")}_cosmic_blueprint.jpg`;
      const jpgDataUrl = canvas.toDataURL("image/jpeg", 0.92);

      // Try Web Share API first (opens native share sheet on mobile)
      if (navigator.share && navigator.canShare) {
        try {
          const blob = await (await fetch(jpgDataUrl)).blob();
          const file = new File([blob], filename, { type: "image/jpeg" });
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({ files: [file], title: `${name || "My"} Cosmic Blueprint` });
            return;
          }
        } catch (shareErr) {
          // Share cancelled or failed — fall through to download
        }
      }

      // Fallback: download as JPG
      const link = document.createElement("a");
      link.download = filename;
      link.href = jpgDataUrl;
      link.click();
    } catch(e) {
      alert("Could not save. Please take a screenshot instead.");
    }
  }

  function calculate() {
    if (!year||!month||!day) { setError("Please enter your complete birth date."); return; }
    if (parseInt(month)<1||parseInt(month)>12) { setError("Please enter a valid month (1-12)."); return; }
    if (parseInt(day)<1||parseInt(day)>31) { setError("Please enter a valid day (1-31)."); return; }
    setError("");
    try {
      const result = calcChart(
        parseInt(year), parseInt(month), parseInt(day),
        parseInt(hour), parseInt(minute),
        effectiveTz, city.lat, city.lon
      );
      setChart(result);
      setScreen("result");
      window.scrollTo(0,0);
    } catch(e) {
      setError("Calculation error: " + e.message);
    }
  }

  // ── RESULT SCREEN ────────────────────────────────────────────────────────────
  if (screen === "result" && chart) {
    return (
      <div style={bgStyle}>
        <Stars/>
        <style>{`@keyframes fadeInUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>

        {/* Hidden capture div */}
        <div ref={captureRef} style={{
          position:"fixed",left:-9999,top:0,
          background:"linear-gradient(160deg,#0d0221 0%,#1a0545 40%,#2d0b6b 70%,#0d0221 100%)",
          padding:"28px 20px 32px",width:480,
          display:"flex",flexDirection:"column",alignItems:"center",
        }}>
          <div style={{fontSize:13,color:"#c9a84c",letterSpacing:3,marginBottom:8}}>✦ Coco's Cosmic Tarot ✦</div>
          <div style={{fontSize:11,color:"#7a5a3a",letterSpacing:2,marginBottom:2}}>COSMIC BLUEPRINT FOR</div>
          <div style={{fontSize:17,color:"#c9a84c",letterSpacing:2,marginBottom:2}}>{name||"My Chart"}</div>
          <div style={{fontSize:10,color:"#7a5a3a",marginBottom:14}}>{day}/{month}/{year} · {city.label}, {country}</div>
          <div style={{width:"100%",borderTop:"1px solid #7c5c2e44",marginBottom:8}}/>
          <div style={{display:"grid",gridTemplateColumns:"1.4fr 1.8fr 0.8fr",width:"100%",marginBottom:6}}>
            {["PLANET","SIGN","HOUSE"].map(h=>(
              <div key={h} style={{fontSize:9,color:"#a07840",letterSpacing:2,textAlign:"center",padding:"4px 0"}}>{h}</div>
            ))}
          </div>
          {chart.map(({planet,sign,signGlyph,degrees,minutes,house})=>(
            <div key={planet} style={{display:"grid",gridTemplateColumns:"1.4fr 1.8fr 0.8fr",width:"100%",borderTop:"1px solid #7c5c2e22",padding:"5px 0"}}>
              <div style={{display:"flex",alignItems:"center",gap:6,paddingLeft:8}}>
                <span style={{fontSize:13}}>{PLANET_GLYPHS[planet]}</span>
                <span style={{fontSize:11,color:PLANET_COLORS[planet]}}>{planet}</span>
              </div>
              <div style={{textAlign:"center",fontSize:11,color:"#e8d5b7"}}>
                {signGlyph} {sign} <span style={{color:"#a07840"}}>{degrees}°{String(minutes).padStart(2,"0")}'</span>
              </div>
              <div style={{textAlign:"center",fontSize:11,color:"#a07840"}}>{ordinal(house)}</div>
            </div>
          ))}
        </div>

        {/* Visible table */}
        <div style={{maxWidth:560,margin:"0 auto",position:"relative",zIndex:1}}>
          <div style={{textAlign:"center",marginBottom:24,animation:"fadeInUp 0.5s ease-out"}}>
            <div style={{fontSize:11,color:"#7a5a3a",letterSpacing:2,marginBottom:4}}>COSMIC BLUEPRINT FOR</div>
            <div style={{fontSize:desktop?26:20,color:"#c9a84c",letterSpacing:2,marginBottom:4}}>{name||"My Chart"}</div>
            <div style={{fontSize:11,color:"#7a5a3a"}}>{day}/{month}/{year} · {String(hour).padStart(2,"0")}:{String(minute).padStart(2,"0")} · {city.label}, {country}</div>
          </div>

          <div style={{background:"#ffffff08",border:"1px solid #7c5c2e44",borderRadius:16,overflow:"hidden",marginBottom:20,animation:"fadeInUp 0.5s ease-out"}}>
            <div style={{display:"grid",gridTemplateColumns:"1.4fr 1.8fr 0.8fr",background:"#ffffff0a",padding:"12px 20px",borderBottom:"1px solid #7c5c2e44"}}>
              {["PLANET","SIGN","HOUSE"].map(h=>(
                <div key={h} style={{fontSize:11,color:"#a07840",letterSpacing:2,textAlign:"center"}}>{h}</div>
              ))}
            </div>
            {chart.map(({planet,sign,signGlyph,degrees,minutes,house},idx)=>(
              <div key={planet} style={{
                display:"grid",gridTemplateColumns:"1.4fr 1.8fr 0.8fr",
                padding:"14px 20px",
                borderBottom:idx<chart.length-1?"1px solid #7c5c2e22":"none",
                animation:`fadeInUp 0.4s ease-out ${idx*0.05}s both`,
              }}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <span style={{fontSize:20}}>{PLANET_GLYPHS[planet]}</span>
                  <span style={{fontSize:desktop?14:13,color:PLANET_COLORS[planet]}}>{planet}</span>
                </div>
                <div style={{textAlign:"center",fontSize:desktop?14:13,color:"#e8d5b7"}}>
                  {signGlyph} {sign}{" "}
                  <span style={{color:"#a07840",fontSize:12}}>{degrees}°{String(minutes).padStart(2,"0")}'</span>
                </div>
                <div style={{textAlign:"center",fontSize:desktop?13:12,color:"#a07840"}}>
                  {ordinal(house)}
                </div>
              </div>
            ))}
          </div>

          <div style={{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center",marginBottom:16}}>
            <button onClick={saveChart} style={{...btn("#5a2e0e"),width:"auto",padding:"11px 28px",fontSize:13}}>
              📸 Save My Chart
            </button>
            <button onClick={()=>{setScreen("form");setChart(null);window.scrollTo(0,0);}}
              style={{...btn("#2a1a2a"),width:"auto",padding:"11px 28px",fontSize:13}}>
              ← Recalculate
            </button>
            <button onClick={onHome} style={{...btn("#2a1a1a"),width:"auto",padding:"11px 28px",fontSize:13}}>
              ⌂ Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── FORM SCREEN ──────────────────────────────────────────────────────────────
  return (
    <div style={bgStyle}>
      <Stars/>
      <div style={{maxWidth:640,margin:"0 auto",position:"relative",zIndex:1}}>

        <div style={{textAlign:"center",marginBottom:32}}>
          <div style={{fontSize:desktop?28:22,color:"#c9a84c",letterSpacing:3,marginBottom:14}}>
            ✦ Your Cosmic Blueprint ✦
          </div>
          <div style={{fontSize:13,color:"#a07840",lineHeight:1.9,maxWidth:500,margin:"0 auto"}}>
            Every person is born at a unique moment in time, when the planets were arranged in a specific
            pattern across the sky. This arrangement — your natal chart — is like a cosmic fingerprint,
            a map of the energies and themes that shape who you are.
            <br/><br/>
            By understanding where each planet falls in your chart, you gain deeper insight into your
            personality, the obstacles you're likely to face in life, how you instinctively react to
            situations, what drives you, what you fear, what you love, how you attract, and so much more.
            <br/><br/>
            <em style={{color:"#c9a84c88"}}>Think of it as a mirror, one that reflects your truest self.</em>
          </div>
        </div>

        <div style={{background:"#ffffff08",border:"1px solid #7c5c2e44",borderRadius:16,padding:desktop?"32px 36px":"24px 20px",marginBottom:24}}>
          <div style={{display:"flex",flexDirection:"column",gap:20}}>

            <div>
              <Label>YOUR NAME</Label>
              <input style={inputStyle} type="text" placeholder="Enter your name" value={name} onChange={e=>setName(e.target.value)}/>
            </div>

            <div>
              <Label>DATE OF BIRTH</Label>
              <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:10}}>
                <input style={inputStyle} type="number" placeholder="Year (e.g. 1993)" value={year} onChange={e=>setYear(e.target.value)} min="1900" max="2099"/>
                <input style={inputStyle} type="number" placeholder="Month" value={month} onChange={e=>setMonth(e.target.value)} min="1" max="12"/>
                <input style={inputStyle} type="number" placeholder="Day" value={day} onChange={e=>setDay(e.target.value)} min="1" max="31"/>
              </div>
            </div>

            <div>
              <Label>BIRTH TIME</Label>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                <select style={selectStyle} value={hour} onChange={e=>setHour(e.target.value)}>
                  {Array.from({length:24},(_,i)=>(
                    <option key={i} value={i} style={{background:"#1a0545"}}>{String(i).padStart(2,"0")}:00</option>
                  ))}
                </select>
                <select style={selectStyle} value={minute} onChange={e=>setMinute(e.target.value)}>
                  {Array.from({length:60},(_,i)=>(
                    <option key={i} value={i} style={{background:"#1a0545"}}>: {String(i).padStart(2,"0")}</option>
                  ))}
                </select>
              </div>
              <div style={{fontSize:11,color:"#7a5a3a",marginTop:6}}>Birth time affects your Rising sign and house placements.</div>
            </div>

            <div>
              <Label>COUNTRY OF BIRTH</Label>
              <select style={selectStyle} value={country} onChange={handleCountryChange}>
                {COUNTRIES.map(c=>(<option key={c} value={c} style={{background:"#1a0545"}}>{c}</option>))}
              </select>
            </div>

            <div>
              <Label>CITY OF BIRTH</Label>
              <select style={selectStyle} value={cityIdx} onChange={e=>{setCityIdx(parseInt(e.target.value));setChart(null);}}>
                {cities.map((c,i)=>(<option key={i} value={i} style={{background:"#1a0545"}}>{c.label}</option>))}
              </select>
              <div style={{fontSize:11,color:"#7a5a3a",marginTop:6}}>
                Timezone: UTC{effectiveTz>=0?"+":""}{effectiveTz} · auto-applied
              </div>
            </div>

            {showDst && (
              <div style={{background:"#ffffff08",border:"1px solid #7c5c2e44",borderRadius:10,padding:"14px 16px"}}>
                <div style={{fontSize:12,color:"#a07840",marginBottom:8}}>DAYLIGHT SAVING TIME (DST)</div>
                <div style={{fontSize:12,color:"#7a5a3a",marginBottom:12,lineHeight:1.6}}>
                  {(country==="United States"||country==="Canada")
                    ? "US/Canada: DST runs March to November."
                    : (country==="Australia"||country==="New Zealand")
                    ? "AU/NZ: DST runs October to April."
                    : "This country observes DST in summer months."
                  }{" "}Were you born during this period?
                </div>
                <div style={{display:"flex",gap:10}}>
                  {["No (Standard Time)","Yes (Daylight Saving)"].map((label,i)=>(
                    <button key={i} onClick={()=>setDst(i===1)} style={{
                      flex:1,padding:"8px 0",borderRadius:8,fontSize:12,cursor:"pointer",
                      fontFamily:"'Georgia', serif",
                      background:dst===(i===1)?"#3b1f6e":"#ffffff0d",
                      border:`1px solid ${dst===(i===1)?"#c9a84c":"#7c5c2e"}`,
                      color:dst===(i===1)?"#c9a84c":"#a07840",
                    }}>{label}</button>
                  ))}
                </div>
              </div>
            )}

            {error && <div style={{color:"#c94c4c",fontSize:12}}>{error}</div>}

            <button onClick={calculate} style={btn("#3b1f6e")}>✦ Calculate My Chart</button>

          </div>
        </div>

        <div style={{textAlign:"center",marginBottom:16}}>
          <button onClick={onHome} style={{...btn("#2a1a1a"),width:"auto",padding:"10px 32px",fontSize:13}}>
            ⌂ Home
          </button>
        </div>

      </div>
    </div>
  );
}
