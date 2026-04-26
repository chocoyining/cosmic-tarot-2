import { useState, useRef, useEffect } from "react";
import { Origin, Horoscope } from "circular-natal-horoscope-js";
import ZH from "./translations";

const EMAILJS_SERVICE_ID  = "service_fcfjy1t";
const EMAILJS_TEMPLATE_ID = "template_lpj8t7s";
const EMAILJS_PUBLIC_KEY  = "sy_V-u-yyGBno659d";

const CLOUDINARY_CLOUD    = "da1asg0hq";
const CLOUDINARY_PRESET   = "coco_readings";

// ── Location Database ─────────────────────────────────────────────────────────
const LOCATION_DB = {
  "Malaysia": {
    dst: false,
    cities: [
      { label: "Johor",             lat: 1.4927,   lon: 103.7414, tz: 8 },
      { label: "Kuala Lumpur",      lat: 3.1390,   lon: 101.6869, tz: 8 },
      { label: "Selangor",          lat: 3.1073,   lon: 101.6067, tz: 8 },
      { label: "Penang",            lat: 5.4141,   lon: 100.3288, tz: 8 },
      { label: "Perak",             lat: 4.5975,   lon: 101.0901, tz: 8 },
      { label: "Melaka",            lat: 2.1896,   lon: 102.2501, tz: 8 },
      { label: "Negeri Sembilan",   lat: 2.7297,   lon: 101.9381, tz: 8 },
      { label: "Sarawak",           lat: 1.5535,   lon: 110.3593, tz: 8 },
      { label: "Sabah",             lat: 5.9804,   lon: 116.0735, tz: 8 },
      { label: "Kedah",             lat: 6.1248,   lon: 100.3678, tz: 8 },
      { label: "Kelantan",          lat: 6.1254,   lon: 102.2380, tz: 8 },
      { label: "Terengganu",        lat: 5.3302,   lon: 103.1408, tz: 8 },
      { label: "Pahang",            lat: 3.8077,   lon: 103.3260, tz: 8 },
      { label: "Perlis",            lat: 6.4449,   lon: 100.1985, tz: 8 },
      { label: "Putrajaya",         lat: 2.9264,   lon: 101.6964, tz: 8 },
      { label: "Labuan",            lat: 5.2831,   lon: 115.2308, tz: 8 },
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
      { label: "Chennai",           lat: 13.0827,  lon: 80.2707,  tz: 5.5 },
      { label: "Kolkata",           lat: 22.5726,  lon: 88.3639,  tz: 5.5 },
      { label: "Delhi",             lat: 28.7041,  lon: 77.1025,  tz: 5.5 },
      { label: "Bangalore",         lat: 12.9716,  lon: 77.5946,  tz: 5.5 },
      { label: "Chennai",           lat: 13.0827,  lon: 80.2707,  tz: 5.5 },
      { label: "Kolkata",           lat: 22.5726,  lon: 88.3639,  tz: 5.5 },
    ],
  },
  "United States": {
    dst: true,
    cities: [
      // AK - Alaska
      { label: "Anchorage, AK",          lat: 61.2181,  lon: -149.9003,  tz: -9 },
      { label: "Fairbanks, AK",          lat: 64.8378,  lon: -147.7164,  tz: -9 },
      // AL - Alabama
      { label: "Birmingham, AL",         lat: 33.5186,  lon: -86.8104,   tz: -6 },
      { label: "Huntsville, AL",         lat: 34.7304,  lon: -86.5861,   tz: -6 },
      { label: "Mobile, AL",             lat: 30.6954,  lon: -88.0399,   tz: -6 },
      { label: "Montgomery, AL",         lat: 32.3668,  lon: -86.2999,   tz: -6 },
      // AR - Arkansas
      { label: "Fayetteville, AR",       lat: 36.0822,  lon: -94.1719,   tz: -6 },
      { label: "Little Rock, AR",        lat: 34.7465,  lon: -92.2896,   tz: -6 },
      // AZ - Arizona
      { label: "Phoenix, AZ",            lat: 33.4484,  lon: -112.0740,  tz: -7 },
      { label: "Scottsdale, AZ",         lat: 33.4942,  lon: -111.9261,  tz: -7 },
      { label: "Tucson, AZ",             lat: 32.2226,  lon: -110.9747,  tz: -7 },
      // CA - California
      { label: "Bakersfield, CA",        lat: 35.3733,  lon: -119.0187,  tz: -8 },
      { label: "Fresno, CA",             lat: 36.7378,  lon: -119.7871,  tz: -8 },
      { label: "Long Beach, CA",         lat: 33.7701,  lon: -118.1937,  tz: -8 },
      { label: "Los Angeles, CA",        lat: 34.0522,  lon: -118.2437,  tz: -8 },
      { label: "Oakland, CA",            lat: 37.8044,  lon: -122.2712,  tz: -8 },
      { label: "Sacramento, CA",         lat: 38.5816,  lon: -121.4944,  tz: -8 },
      { label: "San Diego, CA",          lat: 32.7157,  lon: -117.1611,  tz: -8 },
      { label: "San Francisco, CA",      lat: 37.7749,  lon: -122.4194,  tz: -8 },
      { label: "San Jose, CA",           lat: 37.3382,  lon: -121.8863,  tz: -8 },
      { label: "Santa Barbara, CA",      lat: 34.4208,  lon: -119.6982,  tz: -8 },
      { label: "Santa Monica, CA",       lat: 34.0195,  lon: -118.4912,  tz: -8 },
      // CO - Colorado
      { label: "Colorado Springs, CO",   lat: 38.8339,  lon: -104.8214,  tz: -7 },
      { label: "Denver, CO",             lat: 39.7392,  lon: -104.9903,  tz: -7 },
      // CT - Connecticut
      { label: "Hartford, CT",           lat: 41.7658,  lon: -72.6851,   tz: -5 },
      { label: "New Haven, CT",          lat: 41.3083,  lon: -72.9279,   tz: -5 },
      // DC
      { label: "Washington DC",          lat: 38.9072,  lon: -77.0369,   tz: -5 },
      // FL - Florida
      { label: "Jacksonville, FL",       lat: 30.3322,  lon: -81.6557,   tz: -5 },
      { label: "Miami, FL",              lat: 25.7617,  lon: -80.1918,   tz: -5 },
      { label: "Orlando, FL",            lat: 28.5383,  lon: -81.3792,   tz: -5 },
      { label: "Tampa, FL",              lat: 27.9506,  lon: -82.4572,   tz: -5 },
      // GA - Georgia
      { label: "Atlanta, GA",            lat: 33.7490,  lon: -84.3880,   tz: -5 },
      { label: "Savannah, GA",           lat: 32.0835,  lon: -81.0998,   tz: -5 },
      // HI - Hawaii
      { label: "Honolulu, HI",           lat: 21.3069,  lon: -157.8583,  tz: -10 },
      // IA - Iowa
      { label: "Des Moines, IA",         lat: 41.5868,  lon: -93.6250,   tz: -6 },
      // ID - Idaho
      { label: "Boise, ID",              lat: 43.6150,  lon: -116.2023,  tz: -7 },
      // IL - Illinois
      { label: "Chicago, IL",            lat: 41.8781,  lon: -87.6298,   tz: -6 },
      { label: "Springfield, IL",        lat: 39.7817,  lon: -89.6501,   tz: -6 },
      // IN - Indiana
      { label: "Indianapolis, IN",       lat: 39.7684,  lon: -86.1581,   tz: -5 },
      // KS - Kansas
      { label: "Wichita, KS",            lat: 37.6872,  lon: -97.3301,   tz: -6 },
      // KY - Kentucky
      { label: "Louisville, KY",         lat: 38.2527,  lon: -85.7585,   tz: -5 },
      { label: "Lexington, KY",          lat: 38.0406,  lon: -84.5037,   tz: -5 },
      // LA - Louisiana
      { label: "Baton Rouge, LA",        lat: 30.4515,  lon: -91.1871,   tz: -6 },
      { label: "New Orleans, LA",        lat: 29.9511,  lon: -90.0715,   tz: -6 },
      // MA - Massachusetts
      { label: "Boston, MA",             lat: 42.3601,  lon: -71.0589,   tz: -5 },
      // MD - Maryland
      { label: "Baltimore, MD",          lat: 39.2904,  lon: -76.6122,   tz: -5 },
      // MI - Michigan
      { label: "Detroit, MI",            lat: 42.3314,  lon: -83.0458,   tz: -5 },
      { label: "Grand Rapids, MI",       lat: 42.9634,  lon: -85.6681,   tz: -5 },
      // MN - Minnesota
      { label: "Minneapolis, MN",        lat: 44.9778,  lon: -93.2650,   tz: -6 },
      // MO - Missouri
      { label: "Kansas City, MO",        lat: 39.0997,  lon: -94.5786,   tz: -6 },
      { label: "St. Louis, MO",          lat: 38.6270,  lon: -90.1994,   tz: -6 },
      // MS - Mississippi
      { label: "Jackson, MS",            lat: 32.2988,  lon: -90.1848,   tz: -6 },
      // MT - Montana
      { label: "Billings, MT",           lat: 45.7833,  lon: -108.5007,  tz: -7 },
      // NC - North Carolina
      { label: "Charlotte, NC",          lat: 35.2271,  lon: -80.8431,   tz: -5 },
      { label: "Raleigh, NC",            lat: 35.7796,  lon: -78.6382,   tz: -5 },
      // NE - Nebraska
      { label: "Omaha, NE",              lat: 41.2565,  lon: -95.9345,   tz: -6 },
      // NJ - New Jersey
      { label: "Newark, NJ",             lat: 40.7357,  lon: -74.1724,   tz: -5 },
      // NM - New Mexico
      { label: "Albuquerque, NM",        lat: 35.0853,  lon: -106.6056,  tz: -7 },
      // NV - Nevada
      { label: "Las Vegas, NV",          lat: 36.1699,  lon: -115.1398,  tz: -8 },
      { label: "Reno, NV",               lat: 39.5296,  lon: -119.8138,  tz: -8 },
      // NY - New York
      { label: "Albany, NY",             lat: 42.6526,  lon: -73.7562,   tz: -5 },
      { label: "Buffalo, NY",            lat: 42.8864,  lon: -78.8784,   tz: -5 },
      { label: "New York, NY",           lat: 40.7128,  lon: -74.0060,   tz: -5 },
      { label: "Rochester, NY",          lat: 43.1566,  lon: -77.6088,   tz: -5 },
      // OH - Ohio
      { label: "Cincinnati, OH",         lat: 39.1031,  lon: -84.5120,   tz: -5 },
      { label: "Cleveland, OH",          lat: 41.4993,  lon: -81.6944,   tz: -5 },
      { label: "Columbus, OH",           lat: 39.9612,  lon: -82.9988,   tz: -5 },
      // OK - Oklahoma
      { label: "Oklahoma City, OK",      lat: 35.4676,  lon: -97.5164,   tz: -6 },
      { label: "Tulsa, OK",              lat: 36.1540,  lon: -95.9928,   tz: -6 },
      // OR - Oregon
      { label: "Portland, OR",           lat: 45.5051,  lon: -122.6750,  tz: -8 },
      // PA - Pennsylvania
      { label: "Philadelphia, PA",       lat: 39.9526,  lon: -75.1652,   tz: -5 },
      { label: "Pittsburgh, PA",         lat: 40.4406,  lon: -79.9959,   tz: -5 },
      // RI - Rhode Island
      { label: "Providence, RI",         lat: 41.8240,  lon: -71.4128,   tz: -5 },
      // SC - South Carolina
      { label: "Charleston, SC",         lat: 32.7765,  lon: -79.9311,   tz: -5 },
      { label: "Columbia, SC",           lat: 34.0007,  lon: -81.0348,   tz: -5 },
      // TN - Tennessee
      { label: "Memphis, TN",            lat: 35.1495,  lon: -90.0490,   tz: -6 },
      { label: "Nashville, TN",          lat: 36.1627,  lon: -86.7816,   tz: -6 },
      // TX - Texas
      { label: "Austin, TX",             lat: 30.2672,  lon: -97.7431,   tz: -6 },
      { label: "Dallas, TX",             lat: 32.7767,  lon: -96.7970,   tz: -6 },
      { label: "El Paso, TX",            lat: 31.7619,  lon: -106.4850,  tz: -7 },
      { label: "Fort Worth, TX",         lat: 32.7555,  lon: -97.3308,   tz: -6 },
      { label: "Houston, TX",            lat: 29.7604,  lon: -95.3698,   tz: -6 },
      { label: "Lubbock, TX",            lat: 33.5779,  lon: -101.8552,  tz: -6 },
      { label: "San Antonio, TX",        lat: 29.4241,  lon: -98.4936,   tz: -6 },
      // UT - Utah
      { label: "Salt Lake City, UT",     lat: 40.7608,  lon: -111.8910,  tz: -7 },
      // VA - Virginia
      { label: "Richmond, VA",           lat: 37.5407,  lon: -77.4360,   tz: -5 },
      { label: "Virginia Beach, VA",     lat: 36.8529,  lon: -75.9780,   tz: -5 },
      // WA - Washington
      { label: "Seattle, WA",            lat: 47.6062,  lon: -122.3321,  tz: -8 },
      { label: "Spokane, WA",            lat: 47.6588,  lon: -117.4260,  tz: -8 },
      // WI - Wisconsin
      { label: "Milwaukee, WI",          lat: 43.0389,  lon: -87.9065,   tz: -6 },
      // WY - Wyoming
      { label: "Cheyenne, WY",           lat: 41.1400,  lon: -104.8202,  tz: -7 },
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

// ── Chart calculation using circular-natal-horoscope-js (Placidus) ──────────
function getSignGlyph(signName) {
  const glyphs = {
    "Aries":"♈","Taurus":"♉","Gemini":"♊","Cancer":"♋",
    "Leo":"♌","Virgo":"♍","Libra":"♎","Scorpio":"♏",
    "Sagittarius":"♐","Capricorn":"♑","Aquarius":"♒","Pisces":"♓"
  };
  return glyphs[signName] || "✦";
}

function calcChart(year, month, day, hour, minute, tz, lat, lon) {
  // Origin handles timezone automatically from lat/lon
  // Pass LOCAL time directly — do NOT convert to UTC
  const origin = new Origin({
    year:      year,
    month:     month - 1, // Origin uses 0-indexed months (0=Jan, 11=Dec)
    date:      day,
    hour:      hour,
    minute:    minute,
    latitude:  lat,
    longitude: lon,
  });

  const horoscope = new Horoscope({
    origin,
    houseSystem: "placidus",
    zodiac: "tropical",
    aspectPoints: [],
    aspectWithPoints: [],
    aspectTypes: [],
  });

  const PLANET_KEYS = [
    { key: "sun",     name: "Sun" },
    { key: "moon",    name: "Moon" },
    { key: "mercury", name: "Mercury" },
    { key: "venus",   name: "Venus" },
    { key: "mars",    name: "Mars" },
    { key: "jupiter", name: "Jupiter" },
    { key: "saturn",  name: "Saturn" },
    { key: "uranus",  name: "Uranus" },
    { key: "neptune", name: "Neptune" },
    { key: "pluto",   name: "Pluto" },
  ];

  // Rising — use horoscope.Ascendant (direct property)
  const asc = horoscope.Ascendant;
  const ascDecDeg = asc.ChartPosition.Ecliptic.DecimalDegrees;
  const ascDeg = Math.floor(ascDecDeg % 30);
  const ascMin = Math.floor(((ascDecDeg % 30) - ascDeg) * 60);

  const results = [{
    planet:    "Rising",
    sign:      asc.Sign.label,
    signGlyph: getSignGlyph(asc.Sign.label),
    degrees:   ascDeg,
    minutes:   ascMin,
    house:     1,
  }];

  for (const { key, name } of PLANET_KEYS) {
    try {
      const body = horoscope.CelestialBodies[key];
      const decDeg = body.ChartPosition.Ecliptic.DecimalDegrees;
      const deg = Math.floor(decDeg % 30);
      const min = Math.floor(((decDeg % 30) - deg) * 60);
      // House index: Houses array is 0-indexed, id is 1-12
      const houseNum = body.House ? body.House.id : 1;
      results.push({
        planet:    name,
        sign:      body.Sign.label,
        signGlyph: getSignGlyph(body.Sign.label),
        degrees:   deg,
        minutes:   min,
        house:     houseNum,
      });
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
export default function BirthChart({ onHome, lang, onToggleLang }) {
  const t = lang === "zh" ? ZH : null;
  const [name, setName]       = useState("");
  const [year, setYear]       = useState("");
  const [month, setMonth]     = useState("");
  const [day, setDay]         = useState("");
  const [hour, setHour]       = useState("12");
  const [minute, setMinute]   = useState("0");
  const [country, setCountry] = useState("");
  const [cityIdx, setCityIdx] = useState(0);
  const [dst, setDst]         = useState(false);
  const [screen, setScreen]   = useState("form");
  const [chart, setChart]     = useState(null);
  const [error, setError]       = useState("");
  const [toast, setToast]       = useState(false);
  const [clientContact, setClientContact] = useState("");
  const [contactError, setContactError]   = useState(false);
  const [customCity, setCustomCity]         = useState("");
  const [customLoading, setCustomLoading]   = useState(false);
  const [customError, setCustomError]       = useState("");
  const captureRef            = useRef(null);
  const desktop               = window.innerWidth > 600;

  async function geocodeCity() {
    if (!customCity.trim()) return;
    setCustomLoading(true);
    setCustomError("");
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(customCity)}&format=json&limit=1`,
        { headers: { "Accept-Language": "en" } }
      );
      const data = await res.json();
      if (!data || data.length === 0) {
        setCustomError("City not found. Please try a different spelling.");
        setCustomLoading(false);
        return;
      }
      const result = data[0];
      const lat = parseFloat(result.lat);
      const lon = parseFloat(result.lon);
      // Estimate timezone from longitude
      const tzRaw = Math.round(lon / 15);
      const tz = Math.max(-12, Math.min(14, tzRaw));
      // Override city/country with custom
      setCountry("Custom");
      setCityIdx(0);
      // Store custom coords in a special slot
      LOCATION_DB["Custom"] = {
        dst: false,
        cities: [{ label: customCity, lat, lon, tz }]
      };
      setCustomError("");
      setCustomLoading(false);
    } catch(e) {
      setCustomError("Could not look up city. Please check your connection.");
      setCustomLoading(false);
    }
  }

  useEffect(() => {
    if (window.emailjs) return;
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    script.onload = () => window.emailjs.init(EMAILJS_PUBLIC_KEY);
    document.head.appendChild(script);
  }, []);



  const countryData = LOCATION_DB[country] || { dst: false, cities: [{ label: "—", lat: 0, lon: 0, tz: 0 }] };
  const cities      = countryData.cities;
  const city        = cities[Math.min(cityIdx, cities.length - 1)];
  const showDst     = countryData.dst;
  const effectiveTz = dst ? city.tz + 1 : city.tz;

  function handleCountryChange(e) {
    setCountry(e.target.value); setCityIdx(0); setDst(false); setChart(null);
  }

  async function sendAndSaveChart() {
    if (!captureRef.current) return;
    try {
      const canvas = await window.html2canvas(captureRef.current, {
        useCORS:true, allowTaint:true, backgroundColor:"#0d0221", scale:2, width:480, windowWidth:480,
      });
      const filename = `${(name||"my").replace(/\s+/g,"_")}_cosmic_blueprint.jpg`;
      const jpgDataUrl = canvas.toDataURL("image/jpeg", 0.92);

      // Upload to Cloudinary
      let spreadImageUrl = "Image upload failed";
      try {
        const blob = await (await fetch(jpgDataUrl)).blob();
        const formData = new FormData();
        formData.append("file", blob, filename);
        formData.append("upload_preset", CLOUDINARY_PRESET);
        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/image/upload`, {
          method: "POST", body: formData,
        });
        const data = await res.json();
        if (data.secure_url) {
          spreadImageUrl = data.secure_url;
        } else {
          spreadImageUrl = `Upload error: ${JSON.stringify(data.error || data)}`;
        }
      } catch(uploadErr) {
        spreadImageUrl = `Upload exception: ${uploadErr.message}`;
      }

      // Send email via EmailJS
      if (window.emailjs) {
        await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          client_name:     name || "Unknown",
          client_dob:      day && month && year ? `${day}/${month}/${year}` : "Not provided",
          client_contact:  clientContact || "Not provided",
          spread_name:     "Cosmic Blueprint (Birth Chart)",
          client_question: `${city.label}, ${country}`,
          sent_at:         new Date().toLocaleString("en-GB"),
          spread_image:    spreadImageUrl,
        });
      }

      // Save image
      const isMobileDevice = navigator.maxTouchPoints > 0 && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
      if (isMobileDevice && navigator.share && navigator.canShare) {
        try {
          const blob = await (await fetch(jpgDataUrl)).blob();
          const file = new File([blob], filename, { type: "image/jpeg" });
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({ files: [file], title: `${name || "My"} Cosmic Blueprint` });
            showToast();
            return;
          }
        } catch (shareErr) {}
      }
      const link = document.createElement("a");
      link.download = filename;
      link.href = jpgDataUrl;
      link.click();
      showToast();
    } catch(e) {
      alert("Something went wrong. Please try again.");
    }
  }

  function showToast() {
    setToast(true);
    setTimeout(() => setToast(false), 5000);
  }

  async function saveChart() {
    if (!captureRef.current) return;
    try {
      const canvas = await window.html2canvas(captureRef.current, {
        useCORS:true, allowTaint:true, backgroundColor:"#0d0221", scale:2, width:480, windowWidth:480,
      });
      const filename = `${(name||"my").replace(/\s+/g,"_")}_cosmic_blueprint.jpg`;
      const jpgDataUrl = canvas.toDataURL("image/jpeg", 0.92);

      // Try Web Share API on mobile only (touch devices)
      const isMobileDevice = navigator.maxTouchPoints > 0 && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
      if (isMobileDevice && navigator.share && navigator.canShare) {
        try {
          const blob = await (await fetch(jpgDataUrl)).blob();
          const file = new File([blob], filename, { type: "image/jpeg" });
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({ files: [file], title: `${name || "My"} Cosmic Blueprint` });
            showToast();
            return;
          }
        } catch (shareErr) {
          // Share cancelled or failed — fall through to download
        }
      }

      // Desktop or fallback: download as JPG
      const link = document.createElement("a");
      link.download = filename;
      link.href = jpgDataUrl;
      link.click();
      showToast();
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
          <div style={{fontSize:11,color:"#7a5a3a",letterSpacing:2,marginBottom:2}}>{t ? t.chart.result_for : "COSMIC BLUEPRINT FOR"}</div>
          <div style={{fontSize:17,color:"#c9a84c",letterSpacing:2,marginBottom:2}}>{name||"My Chart"}</div>
          <div style={{fontSize:10,color:"#7a5a3a",marginBottom:14}}>{day}/{month}/{year} · {String(hour).padStart(2,"0")}:{String(minute).padStart(2,"0")} · {city.label}, {country}</div>
          <div style={{width:"100%",borderTop:"1px solid #7c5c2e44",marginBottom:8}}/>
          <div style={{display:"grid",gridTemplateColumns:"1.4fr 1.8fr 0.8fr",width:"100%",marginBottom:6}}>
            {[t ? t.chart.planet_header : "PLANET", t ? t.chart.sign_header : "SIGN", t ? t.chart.house_header : "HOUSE"].map(h=>(
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
              <div style={{textAlign:"center",fontSize:11,color:"#a07840"}}>{t ? (t.chart.houses[house] || ordinal(house)) : ordinal(house)}</div>
            </div>
          ))}
        </div>

        {/* Visible table */}
        <div style={{maxWidth:560,margin:"0 auto",position:"relative",zIndex:1}}>
          <div style={{textAlign:"center",marginBottom:24,animation:"fadeInUp 0.5s ease-out"}}>
            <div style={{fontSize:11,color:"#7a5a3a",letterSpacing:2,marginBottom:4}}>{t ? t.chart.result_for : "COSMIC BLUEPRINT FOR"}</div>
            <div style={{fontSize:desktop?26:20,color:"#c9a84c",letterSpacing:2,marginBottom:4}}>{name||"My Chart"}</div>
            <div style={{fontSize:11,color:"#7a5a3a"}}>{day}/{month}/{year} · {String(hour).padStart(2,"0")}:{String(minute).padStart(2,"0")} · {city.label}, {country}</div>
          </div>

          <div style={{background:"#ffffff08",border:"1px solid #7c5c2e44",borderRadius:16,overflow:"hidden",marginBottom:20,animation:"fadeInUp 0.5s ease-out"}}>
            <div style={{display:"grid",gridTemplateColumns:"1.4fr 1.8fr 0.8fr",background:"#ffffff0a",padding:"12px 20px",borderBottom:"1px solid #7c5c2e44"}}>
              {[t ? t.chart.planet_header : "PLANET", t ? t.chart.sign_header : "SIGN", t ? t.chart.house_header : "HOUSE"].map(h=>(
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
                  <span style={{fontSize:desktop?14:13,color:PLANET_COLORS[planet]}}>{t && t.chart.planets[planet] ? t.chart.planets[planet] : planet}</span>
                </div>
                <div style={{textAlign:"center",fontSize:desktop?14:13,color:"#e8d5b7"}}>
                  {signGlyph} {t && t.chart.signs[sign] ? t.chart.signs[sign] : sign}{" "}
                  <span style={{color:"#a07840",fontSize:12}}>{degrees}°{String(minutes).padStart(2,"0")}'</span>
                </div>
                <div style={{textAlign:"center",fontSize:desktop?13:12,color:"#a07840"}}>
                  {t ? (t.chart.houses[house] || ordinal(house)) : ordinal(house)}
                </div>
              </div>
            ))}
          </div>

          <div style={{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center",marginBottom:16}}>
            <button onClick={sendAndSaveChart} style={{...btn("#5a0e3a"),width:"auto",padding:"11px 28px",fontSize:13}}>
              {t ? t.chart.btn_send : "✦ Send My Chart to Coco"}
            </button>
            <button onClick={saveChart} style={{...btn("#5a2e0e"),width:"auto",padding:"11px 28px",fontSize:13}}>
              {t ? t.chart.btn_save : "📸 Save My Chart"}
            </button>
            <button onClick={()=>{setScreen("form");setChart(null);window.scrollTo(0,0);}}
              style={{...btn("#2a1a2a"),width:"auto",padding:"11px 28px",fontSize:13}}>
              {t ? t.chart.btn_recalculate : "← Recalculate"}
            </button>
            <button onClick={onHome} style={{...btn("#2a1a1a"),width:"auto",padding:"11px 28px",fontSize:13}}>
              {t ? t.chart.btn_home : "⌂ Home"}
            </button>
            {onToggleLang && <button onClick={onToggleLang} style={{...btn("#2a1a40"),width:"auto",padding:"11px 20px",fontSize:12}}>
              {lang === "en" ? "中文" : "EN"}
            </button>}
          </div>
        </div>

        {/* Toast notification */}
        <style>{`
          @keyframes toastIn { from { opacity:0; transform: translateX(-50%) translateY(20px); } to { opacity:1; transform: translateX(-50%) translateY(0); } }
          @keyframes toastOut { from { opacity:1; } to { opacity:0; } }
        `}</style>
        {toast && (
          <div style={{
            position:"fixed", bottom:40, left:"50%", transform:"translateX(-50%)",
            background:"linear-gradient(135deg,#2d0b6b,#1a0545)",
            border:"1px solid #c9a84c88", borderRadius:32,
            padding:"12px 24px", fontSize:13, color:"#c9a84c",
            letterSpacing:0.5, textAlign:"center", zIndex:999,
            boxShadow:"0 4px 24px #0009",
            animation:"toastIn 0.4s ease-out, toastOut 0.6s ease-in 4.3s forwards",
            whiteSpace:"nowrap",
          }}>
            ✦ Successfully sent to Coco! You will be contacted soon for an exquisite reading ✦
          </div>
        )}
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
            {t ? "✦ 你的星座命盘 ✦" : "✦ Your Cosmic Blueprint ✦"}
          </div>
          <div style={{fontSize:13,color:"#a07840",lineHeight:1.9,maxWidth:500,margin:"0 auto"}}>
            {t ? (
              <>
                每个人都诞生于一个独特的时刻。那一刻，行星以特定的方式排列于天空之中。这个排列，你的星盘，就像一枚宇宙指纹，是塑造你的能量与主题的地图。透过了解每颗行星在星盘中的位置，你将更深入地认识自己的个性、人生中可能面临的挑战、你对事物的本能反应、驱动你的力量、你的恐惧、你的爱，以及更多。
                <br/><br/>
                <em style={{color:"#c9a84c88"}}>把它想象成一面镜子，它将映照出最真实的你。</em>
              </>
            ) : (
              <>
                Every person is born at a unique moment in time, when the planets were arranged in a specific
                pattern across the sky. This arrangement — your natal chart — is like a cosmic fingerprint,
                a map of the energies and themes that shape who you are.
                <br/><br/>
                By understanding where each planet falls in your chart, you gain deeper insight into your
                personality, the obstacles you're likely to face in life, how you instinctively react to
                situations, what drives you, what you fear, what you love, how you attract, and so much more.
                <br/><br/>
                <em style={{color:"#c9a84c88"}}>Think of it as a mirror, one that reflects your truest self.</em>
              </>
            )}
          </div>
        </div>

        <div style={{background:"#ffffff08",border:"1px solid #7c5c2e44",borderRadius:16,padding:desktop?"32px 36px":"24px 20px",marginBottom:24}}>
          <div style={{display:"flex",flexDirection:"column",gap:20}}>

            <div>
              <Label>{t ? t.chart.name_label : "YOUR NAME"}</Label>
              <input style={inputStyle} type="text" placeholder="Enter your name" value={name} onChange={e=>setName(e.target.value)}/>
            </div>

            <div>
              <Label>{t ? t.chart.dob_label : "DATE OF BIRTH"}</Label>
              <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:10}}>
                <input style={inputStyle} type="number" placeholder="Year (e.g. 1993)" value={year} onChange={e=>setYear(e.target.value)} min="1900" max="2099"/>
                <input style={inputStyle} type="number" placeholder="Month" value={month} onChange={e=>setMonth(e.target.value)} min="1" max="12"/>
                <input style={inputStyle} type="number" placeholder="Day" value={day} onChange={e=>setDay(e.target.value)} min="1" max="31"/>
              </div>
            </div>

            <div>
              <Label>{t ? t.chart.time_label : "BIRTH TIME"}</Label>
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
              <div style={{fontSize:11,color:"#7a5a3a",marginTop:6}}>{t ? t.chart.time_hint : "Birth time affects your Rising sign and house placements."}</div>
            </div>

            <div>
              <Label>{t ? t.chart.country_label : "COUNTRY OF BIRTH"}</Label>
              <select style={selectStyle} value={country} onChange={handleCountryChange}>
                <option value="" style={{background:"#1a0545"}}>{t ? "— 请选择 —" : "— Please select —"}</option>
              {COUNTRIES.map(c=>(<option key={c} value={c} style={{background:"#1a0545"}}>{c}</option>))}
              </select>
            </div>

            <div>
              <Label>{t ? t.chart.city_label : "CITY OF BIRTH"}</Label>
              <select style={selectStyle} value={cityIdx} onChange={e=>{setCityIdx(parseInt(e.target.value));setChart(null);setCustomCity("");}}>
                {cities.map((c,i)=>(<option key={i} value={i} style={{background:"#1a0545"}}>{c.label}</option>))}
              </select>
              <div style={{fontSize:11,color:"#7a5a3a",marginTop:6}}>
                {t ? "时区：" : "Timezone: "}UTC{effectiveTz>=0?"+":""}{effectiveTz} · {t ? "自动套用" : "auto-applied"}
              </div>
            </div>

            {/* Custom city lookup */}
            <div style={{background:"#ffffff08",border:"1px solid #7c5c2e44",borderRadius:10,padding:"14px 16px"}}>
              <div style={{fontSize:11,color:"#a07840",letterSpacing:2,marginBottom:8}}>{t ? t.chart.custom_label : "CAN'T FIND YOUR CITY?"}</div>
              <div style={{display:"flex",gap:10}}>
                <input
                  style={{...inputStyle,flex:1}}
                  type="text"
                  placeholder="e.g. Brentwood, CA, USA"
                  value={customCity}
                  onChange={e=>setCustomCity(e.target.value)}
                  onKeyDown={e=>e.key==="Enter" && geocodeCity()}
                />
                <button
                  onClick={geocodeCity}
                  disabled={customLoading}
                  style={{
                    background:"#3b1f6e",border:"1px solid #7c5c2e",borderRadius:8,
                    color:"#e8d5b7",padding:"10px 16px",fontSize:13,cursor:"pointer",
                    fontFamily:"'Georgia',serif",whiteSpace:"nowrap",flexShrink:0,
                  }}
                >
                  {customLoading ? "..." : (t ? t.chart.custom_search : "Search")}
                </button>
              </div>
              {customError && <div style={{color:"#c94c4c",fontSize:11,marginTop:6}}>{customError}</div>}
              {country === "Custom" && !customError && customCity && (
                <div style={{color:"#a8d8a8",fontSize:11,marginTop:6}}>
                  ✓ Found: {city.label} (lat: {city.lat.toFixed(2)}, lon: {city.lon.toFixed(2)}, UTC{city.tz>=0?"+":""}{city.tz})
                </div>
              )}
            </div>

            {showDst && (
              <div style={{background:"#ffffff08",border:"1px solid #7c5c2e44",borderRadius:10,padding:"14px 16px"}}>
                <div style={{fontSize:12,color:"#a07840",marginBottom:8}}>{t ? t.chart.dst_label : "DAYLIGHT SAVING TIME (DST)"}</div>
                <div style={{fontSize:12,color:"#7a5a3a",marginBottom:12,lineHeight:1.6}}>
                  {(country==="United States"||country==="Canada")
                    ? (t ? t.chart.dst_us : "US/Canada: DST runs March to November.")
                    : (country==="Australia"||country==="New Zealand")
                    ? (t ? t.chart.dst_au : "AU/NZ: DST runs October to April.")
                    : (t ? t.chart.dst_other : "This country observes DST in summer months.")
                  }{" "}{t ? t.chart.dst_question : "Were you born during this period?"}
                </div>
                <div style={{display:"flex",gap:10}}>
                  {[t ? t.chart.dst_no : "No (Standard Time)", t ? t.chart.dst_yes : "Yes (Daylight Saving)"].map((label,i)=>(
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

            <div>
              <Label>{t ? t.chart.contact_label : "YOUR EMAIL OR WHATSAPP NUMBER *"}</Label>
              <input style={{...inputStyle, fontSize: desktop ? 16 : 14, borderColor: contactError ? "#c94c4c" : "#7c5c2e"}}
                type="text" placeholder={t ? t.chart.contact_placeholder : "Fill in to receive your reading from Coco"}
                value={clientContact}
                onChange={e => { setClientContact(e.target.value); setContactError(false); }} />
              {contactError && <div style={{color:"#c94c4c", fontSize:11, marginTop:4}}>Please enter your email or WhatsApp to continue.</div>}
            </div>

            <button onClick={calculate} style={btn("#3b1f6e")}>{t ? t.chart.btn_calculate : "✦ Calculate My Chart"}</button>

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
