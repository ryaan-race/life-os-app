/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Dumbbell, 
  Utensils, 
  BookOpen, 
  Monitor, 
  CheckCircle2, 
  Brain, 
  Moon, 
  Sun, 
  Coffee, 
  ChefHat,
  Eye,
  Zap,
  LayoutDashboard,
  Target,
  LineChart,
  ClipboardList,
  PenLine,
  History,
  Plus,
  ChevronLeft,
  ChevronRight,
  Save,
  Sparkles,
  Award,
  BarChart3,
  Download,
  Timer,
  RefreshCw,
  Droplets,
  Bed,
  Wind,
  ListTodo,
  StickyNote,
  Wallet,
  Activity,
  Trash2,
  Minus,
  Check,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { 
  LineChart as ReLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell
} from 'recharts';

// --- Translations ---
const translations = {
  en: {
    dashboard: "Dashboard",
    routine: "Daily Routine",
    workout: "Workout Plan",
    diet: "Diet Plan",
    recipes: "Recipes",
    itLifestyle: "IT Lifestyle",
    trackers: "Trackers",
    aiCoach: "AI Coach",
    skillRoadmap: "Skill Roadmap",
    analytics: "Analytics",
    wellness: "Wellness",
    focus: "Focus Mode",
    notes: "Second Brain",
    finance: "Finance",
    welcome: "Welcome back, Rajesh. Here's your blueprint for today.",
    exportPdf: "Export to PDF",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    language: "Language",
    habitTracker: "365-Day Habit Tracker",
    mealPlanner: "Weekly Meal Planner",
    goalTracker: "Monthly Goal Tracker",
    fitnessTracker: "Fitness Progress Tracker",
    morningJournal: "Morning Journal",
    nightJournal: "Night Journal",
    save: "Save",
    add: "Add",
    cancel: "Cancel",
    liveWorkout: "Live Workout Visualization",
    currentWeight: "Current Weight",
    workoutsThisMonth: "Workouts this month",
    logSession: "Log New Session",
    generateInsights: "Generate Insights",
    focusing: "Focusing...",
    eyeBreak: "Eye Break!",
    successFormula: "Health + Discipline + Skill Learning",
    dailyRoutinePlanner: "Daily Routine Planner",
    aiCoachTitle: "AI Health & Productivity Coach",
    coachAnalysis: "Coach Analysis",
    skillRoadmapTitle: "IT Skill Roadmap & Certifications",
    dailyTechSnippet: "Daily Tech Snippet",
    weightJourney: "Weight Journey",
    habitConsistency: "Habit Consistency",
    day: "Day",
    breakfast: "Breakfast",
    lunch: "Lunch",
    dinner: "Dinner",
    waterTracker: "Water Tracker",
    sleepLog: "Sleep Quality Log",
    breathingTool: "Mindfulness Breathing",
    pomodoro: "Pomodoro Timer",
    big3: "Daily Big 3 Tasks",
    secondBrain: "Second Brain (Notes)",
    bodyMetrics: "Body Metrics Dashboard",
    expenseTracker: "Expense Tracker",
    aiMealPlanner: "AI Meal Planner",
    aiWorkoutCoach: "AI Workout Coach",
    morningMotivation: "Morning Motivation",
    pomodoroTimer: "Pomodoro Timer",
    dailyBig3Tasks: "Daily Big 3 Tasks",
  },
  hi: {
    dashboard: "डैशबोर्ड",
    routine: "दैनिक दिनचर्या",
    workout: "वर्कआउट प्लान",
    diet: "आहार योजना",
    recipes: "व्यंजन",
    itLifestyle: "आईटी जीवनशैली",
    trackers: "ट्रैकर्स",
    aiCoach: "एआई कोच",
    skillRoadmap: "कौशल रोडमैप",
    analytics: "एनालिटिक्स",
    wellness: "कल्याण",
    focus: "फोकस मोड",
    notes: "दूसरा मस्तिष्क",
    finance: "वित्त",
    welcome: "वापसी पर स्वागत है, राजेश। आज के लिए आपकी योजना यहाँ है।",
    exportPdf: "पीडीएफ में निर्यात करें",
    darkMode: "डार्क मोड",
    lightMode: "लाइट मोड",
    language: "भाषा",
    habitTracker: "365-दिवसीय आदत ट्रैकर",
    mealPlanner: "साप्ताहिक भोजन योजनाकार",
    goalTracker: "मासिक लक्ष्य ट्रैकर",
    fitnessTracker: "फिटनेस प्रगति ट्रैकर",
    morningJournal: "सुबह की पत्रिका",
    nightJournal: "रात की पत्रिका",
    save: "सहेजें",
    add: "जोड़ें",
    cancel: "रद्द करें",
    liveWorkout: "लाइव वर्कआउट विज़ुअलाइज़ेशन",
    currentWeight: "वर्तमान वजन",
    workoutsThisMonth: "इस महीने वर्कआउट",
    logSession: "नया सत्र लॉग करें",
    generateInsights: "इनसाइट्स उत्पन्न करें",
    focusing: "ध्यान केंद्रित कर रहे हैं...",
    eyeBreak: "आंखों का ब्रेक!",
    successFormula: "स्वास्थ्य + अनुशासन + कौशल सीखना",
    dailyRoutinePlanner: "दैनिक दिनचर्या योजनाकार",
    aiCoachTitle: "एआई स्वास्थ्य और उत्पादकता कोच",
    coachAnalysis: "कोच विश्लेषण",
    skillRoadmapTitle: "आईटी कौशल रोडमैप और प्रमाणपत्र",
    dailyTechSnippet: "दैनिक तकनीकी स्निपेट",
    weightJourney: "वजन यात्रा",
    habitConsistency: "आदत निरंतरता",
    day: "दिन",
    breakfast: "नाश्ता",
    lunch: "दोपहर का भोजन",
    dinner: "रात का भोजन",
    waterTracker: "पानी ट्रैकर",
    sleepLog: "नींद की गुणवत्ता लॉग",
    breathingTool: "माइंडफुलनेस ब्रीदिंग",
    pomodoro: "पोमोडोरो टाइमर",
    big3: "दैनिक बड़ी 3 कार्य",
    secondBrain: "दूसरा मस्तिष्क (नोट्स)",
    bodyMetrics: "बॉडी मैट्रिक्स डैशबोर्ड",
    expenseTracker: "व्यय ट्रैकर",
    aiMealPlanner: "एआई भोजन योजनाकार",
    aiWorkoutCoach: "एआई वर्कआउट कोच",
    morningMotivation: "सुबह की प्रेरणा",
    pomodoroTimer: "पोमोडोरो टाइमर",
    dailyBig3Tasks: "दैनिक बिग 3 कार्य",
  }
};

// --- 3D Model Component ---
const WorkoutModel = ({ type }: { type: string }) => {
  const groupRef = React.useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      
      if (type === 'Pushups') {
        // Pushup animation: Torso and head move up and down, arms rotate
        const pushupCycle = Math.sin(time * 3);
        groupRef.current.position.y = 0.5 + pushupCycle * 0.3;
        groupRef.current.rotation.x = -Math.PI / 4; // Lean forward
        // Arms
        groupRef.current.children[2].rotation.z = -Math.PI / 4 + pushupCycle * 0.5;
        groupRef.current.children[3].rotation.z = Math.PI / 4 - pushupCycle * 0.5;
      } else if (type === 'Squats') {
        // Squat animation: Torso and head move down, arms move forward
        const squatCycle = Math.sin(time * 2);
        groupRef.current.position.y = 0.5 + squatCycle * 0.4;
        // Arms forward
        groupRef.current.children[2].rotation.x = -Math.PI / 2;
        groupRef.current.children[3].rotation.x = -Math.PI / 2;
      } else if (type === 'Jumping Jacks') {
        // Jumping Jacks: Arms and legs move out and in
        const jumpCycle = Math.sin(time * 5);
        groupRef.current.position.y = 0.5 + Math.abs(jumpCycle) * 0.5;
        // Arms
        groupRef.current.children[2].rotation.z = jumpCycle * 1.5;
        groupRef.current.children[3].rotation.z = -jumpCycle * 1.5;
        // Legs
        groupRef.current.children[4].rotation.z = -jumpCycle * 0.5;
        groupRef.current.children[5].rotation.z = jumpCycle * 0.5;
      } else {
        // Default: Breathing/Idle
        groupRef.current.position.y = 0.5 + Math.sin(time * 2) * 0.05;
        groupRef.current.rotation.x = 0;
        groupRef.current.children[2].rotation.z = Math.sin(time * 2) * 0.1;
        groupRef.current.children[3].rotation.z = -Math.sin(time * 2) * 0.1;
        groupRef.current.children[4].rotation.z = 0;
        groupRef.current.children[5].rotation.z = 0;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.5, 0]}>
      {/* Head */}
      <mesh position={[0, 1.6, 0]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="#10b981" />
      </mesh>
      {/* Torso */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[0.5, 0.8, 0.3]} />
        <meshStandardMaterial color="#064e3b" />
      </mesh>
      {/* Left Arm */}
      <mesh position={[-0.4, 1.2, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.1, 0.6, 0.1]} />
        <meshStandardMaterial color="#10b981" />
      </mesh>
      {/* Right Arm */}
      <mesh position={[0.4, 1.2, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.1, 0.6, 0.1]} />
        <meshStandardMaterial color="#10b981" />
      </mesh>
      {/* Left Leg */}
      <mesh position={[-0.15, 0.3, 0]}>
        <boxGeometry args={[0.15, 0.7, 0.15]} />
        <meshStandardMaterial color="#064e3b" />
      </mesh>
      {/* Right Leg */}
      <mesh position={[0.15, 0.3, 0]}>
        <boxGeometry args={[0.15, 0.7, 0.15]} />
        <meshStandardMaterial color="#064e3b" />
      </mesh>
    </group>
  );
};

// --- Types ---
type Tab = 'dashboard' | 'routine' | 'workout' | 'diet' | 'recipes' | 'it-lifestyle' | 'trackers' | 'ai-coach' | 'skill-roadmap' | 'analytics' | 'wellness' | 'focus' | 'notes' | 'finance';

interface FitnessLog {
  date: string;
  weight: number;
  workout: string;
  notes: string;
}

interface Goal {
  id: string;
  title: string;
  progress: number;
  category: string;
}

interface SleepLog {
  id: string;
  date: string;
  duration: number;
  quality: 'Excellent' | 'Good' | 'Fair' | 'Poor';
}

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
}

interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
}

interface BodyMetric {
  id: string;
  date: string;
  weight: number;
  bodyFat: number;
  muscleMass: number;
}

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

// --- Data ---
const DAILY_ROUTINE = [
  { time: '5:30 AM', activity: 'Wake up + Warm lemon water', icon: <Sun className="w-4 h-4" /> },
  { time: '5:40 AM', activity: 'Fresh up & Stretch', icon: <Zap className="w-4 h-4" /> },
  { time: '6:00 AM', activity: 'Workout / Yoga', icon: <Dumbbell className="w-4 h-4" /> },
  { time: '6:40 AM', activity: 'Bath & Ready', icon: <CheckCircle2 className="w-4 h-4" /> },
  { time: '7:00 AM', activity: 'Cook Breakfast', icon: <ChefHat className="w-4 h-4" /> },
  { time: '7:30 AM', activity: 'Healthy Breakfast', icon: <Utensils className="w-4 h-4" /> },
  { time: '8:00 AM', activity: 'Plan Day / Positive Mindset', icon: <Brain className="w-4 h-4" /> },
  { time: '8:30 AM', activity: 'Travel to Office', icon: <Clock className="w-4 h-4" /> },
  { time: '9:00 AM', activity: 'Office Work Begins', icon: <Monitor className="w-4 h-4" /> },
  { time: '11:00 AM', activity: 'Healthy Snack', icon: <Coffee className="w-4 h-4" /> },
  { time: '1:30 PM', activity: 'Lunch Break', icon: <Utensils className="w-4 h-4" /> },
  { time: '3:30 PM', activity: '5 min Walking Break', icon: <Zap className="w-4 h-4" /> },
  { time: '4:30 PM', activity: 'Tea / Light Snack', icon: <Coffee className="w-4 h-4" /> },
  { time: '6:00 PM', activity: 'Office Finish', icon: <Monitor className="w-4 h-4" /> },
  { time: '6:30 PM', activity: 'Walk / Relax', icon: <Zap className="w-4 h-4" /> },
  { time: '7:00 PM', activity: 'Cook Dinner', icon: <ChefHat className="w-4 h-4" /> },
  { time: '7:30 PM', activity: 'Healthy Dinner', icon: <Utensils className="w-4 h-4" /> },
  { time: '8:15 PM', activity: 'Learning / Growth', icon: <BookOpen className="w-4 h-4" /> },
  { time: '9:00 PM', activity: 'Meditation / Relax', icon: <Brain className="w-4 h-4" /> },
  { time: '9:45 PM', activity: 'Prepare Next Day', icon: <ClipboardList className="w-4 h-4" /> },
  { time: '10:30 PM', activity: 'Sleep', icon: <Moon className="w-4 h-4" /> },
];

const WORKOUT_PLAN = [
  { day: 'Monday', focus: 'Chest + Pushups', exercises: ['Pushups 3x12', 'Incline Pushups 3x10', 'Plank 1 min'] },
  { day: 'Tuesday', focus: 'Cardio + Abs', exercises: ['Leg Raises 3x15', 'Crunches 3x20', 'Mountain Climbers'] },
  { day: 'Wednesday', focus: 'Back + Pull', exercises: ['Superman Hold', 'Pull movement (Resistance Band)'] },
  { day: 'Thursday', focus: 'Yoga + Stretch', exercises: ['Surya Namaskar x10', 'Deep Stretching'] },
  { day: 'Friday', focus: 'Legs', exercises: ['Squats 3x20', 'Lunges 3x12', 'Calf Raises'] },
  { day: 'Saturday', focus: 'Full Body', exercises: ['Burpees', 'Jumping Jacks', 'Shadow Boxing'] },
  { day: 'Sunday', focus: 'Light Walk', exercises: ['15-30 min gentle walk'] },
];

const DIET_PLAN = [
  { day: 'Monday', breakfast: 'Oats + Fruits', lunch: 'Dal + Roti + Sabji', dinner: 'Paneer + Salad' },
  { day: 'Tuesday', breakfast: 'Vegetable Poha', lunch: 'Rice + Dal + Curd', dinner: 'Vegetable Khichdi' },
  { day: 'Wednesday', breakfast: 'Sprouts Salad', lunch: 'Roti + Sabji', dinner: 'Paneer Bhurji' },
  { day: 'Thursday', breakfast: 'Upma', lunch: 'Rice + Rajma', dinner: 'Soup + Salad' },
  { day: 'Friday', breakfast: 'Paneer Sandwich', lunch: 'Dal + Roti', dinner: 'Vegetable Daliya' },
  { day: 'Saturday', breakfast: 'Idli + Sambar', lunch: 'Lemon Rice + Salad', dinner: 'Light Roti + Sabji' },
  { day: 'Sunday', breakfast: 'Paratha + Curd', lunch: 'Home Special', dinner: 'Light Dinner' },
];

const RECIPES = [
  { name: 'Vegetable Khichdi', ingredients: ['Rice', 'Moong Dal', 'Carrot', 'Beans', 'Salt', 'Turmeric'], steps: ['Wash rice and dal', 'Add vegetables', 'Add turmeric and salt', 'Pressure cook 3 whistles'], time: '20 mins' },
  { name: 'Paneer Bhurji', ingredients: ['Paneer', 'Onion', 'Tomato', 'Turmeric', 'Salt'], steps: ['Heat oil', 'Add onion and tomato', 'Add spices', 'Add crushed paneer'], time: '10 mins' },
  { name: 'Sprouts Salad', ingredients: ['Moong Sprouts', 'Onion', 'Tomato', 'Lemon', 'Salt'], steps: ['Mix everything and eat fresh'], time: '5 mins' },
  { name: 'Oats Upma', ingredients: ['Oats', 'Onion', 'Peas', 'Carrot', 'Mustard seeds'], steps: ['Dry roast oats', 'Sauté veggies', 'Add water and oats', 'Cook until soft'], time: '15 mins' },
  { name: 'Moong Dal Chilla', ingredients: ['Moong Dal', 'Ginger', 'Green Chili', 'Salt'], steps: ['Soak and grind dal', 'Make thin pancakes on tawa', 'Cook until golden'], time: '20 mins' },
  { name: 'Quinoa Salad', ingredients: ['Quinoa', 'Cucumber', 'Bell Pepper', 'Olive Oil', 'Lemon'], steps: ['Cook quinoa', 'Chop veggies', 'Mix with dressing'], time: '20 mins' },
  { name: 'Grilled Paneer', ingredients: ['Paneer', 'Curd', 'Tandoori Masala', 'Lemon'], steps: ['Marinate paneer', 'Grill on pan', 'Serve with mint chutney'], time: '15 mins' },
  { name: 'Lentil Soup', ingredients: ['Masoor Dal', 'Garlic', 'Onion', 'Cumin'], steps: ['Boil dal with garlic', 'Temper with cumin', 'Blend for smoothness'], time: '25 mins' },
  { name: 'Vegetable Daliya', ingredients: ['Broken Wheat', 'Mixed Veggies', 'Moong Dal'], steps: ['Roast daliya', 'Add veggies and dal', 'Pressure cook'], time: '20 mins' },
  { name: 'Chickpea Salad', ingredients: ['Boiled Chickpeas', 'Cucumber', 'Tomato', 'Chaat Masala'], steps: ['Mix all ingredients', 'Add lemon juice'], time: '10 mins' },
  { name: 'Stuffed Paratha (Healthy)', ingredients: ['Whole Wheat Flour', 'Grated Cauliflower', 'Green Chili'], steps: ['Make dough', 'Stuff with cauliflower', 'Cook with minimal oil'], time: '25 mins' },
  { name: 'Brown Rice Pulao', ingredients: ['Brown Rice', 'Peas', 'Carrot', 'Cinnamon'], steps: ['Soak brown rice', 'Sauté veggies', 'Cook rice with spices'], time: '40 mins' },
  { name: 'Mushroom Stir Fry', ingredients: ['Mushrooms', 'Bell Pepper', 'Garlic', 'Soy Sauce'], steps: ['Sauté garlic', 'Add mushrooms and peppers', 'Stir fry on high heat'], time: '12 mins' },
  { name: 'Soya Chunks Curry', ingredients: ['Soya Chunks', 'Tomato Puree', 'Onion', 'Garam Masala'], steps: ['Boil soya chunks', 'Make gravy', 'Simmer chunks in gravy'], time: '20 mins' },
  { name: 'Fruit Salad with Nuts', ingredients: ['Apple', 'Banana', 'Papaya', 'Almonds', 'Walnuts'], steps: ['Chop fruits', 'Add soaked nuts', 'Serve chilled'], time: '10 mins' },
  { name: 'Besan Chilla', ingredients: ['Gram Flour', 'Ajwain', 'Turmeric', 'Onion'], steps: ['Make batter', 'Pour on tawa', 'Cook until crisp'], time: '15 mins' },
  { name: 'Vegetable Poha', ingredients: ['Flattened Rice', 'Peanuts', 'Curry Leaves', 'Turmeric'], steps: ['Wash poha', 'Sauté peanuts and veggies', 'Mix poha and steam'], time: '15 mins' },
  { name: 'Masala Oats', ingredients: ['Oats', 'Carrot', 'Beans', 'Garam Masala'], steps: ['Boil oats with veggies', 'Add spices', 'Cook until thick'], time: '10 mins' },
  { name: 'Cucumber Raita', ingredients: ['Curd', 'Grated Cucumber', 'Roasted Cumin'], steps: ['Whisk curd', 'Add cucumber and cumin', 'Serve cold'], time: '5 mins' },
  { name: 'Boiled Egg Salad', ingredients: ['Eggs', 'Black Pepper', 'Lettuce', 'Tomato'], steps: ['Boil eggs', 'Slice and mix with greens'], time: '15 mins' },
  { name: 'Ragi Malt', ingredients: ['Finger Millet Flour', 'Milk/Water', 'Jaggery'], steps: ['Mix ragi with water', 'Cook until thick', 'Add milk and jaggery'], time: '10 mins' },
  { name: 'Sweet Potato Roast', ingredients: ['Sweet Potato', 'Cinnamon', 'Honey'], steps: ['Boil sweet potato', 'Roast with cinnamon', 'Drizzle honey'], time: '20 mins' },
  { name: 'Spinach Smoothie', ingredients: ['Spinach', 'Banana', 'Curd', 'Honey'], steps: ['Blend all ingredients', 'Drink immediately'], time: '5 mins' },
  { name: 'Roasted Makhana', ingredients: ['Fox Nuts', 'Turmeric', 'Salt', 'Ghee'], steps: ['Roast makhana in ghee', 'Add spices', 'Store in airtight container'], time: '10 mins' },
  { name: 'Vegetable Soup', ingredients: ['Cabbage', 'Carrot', 'Onion', 'Ginger'], steps: ['Boil veggies', 'Season with pepper', 'Serve hot'], time: '20 mins' },
  { name: 'Tofu Stir Fry', ingredients: ['Tofu', 'Broccoli', 'Soy Sauce', 'Sesame Seeds'], steps: ['Press tofu', 'Sauté with broccoli', 'Add sauce and seeds'], time: '15 mins' },
  { name: 'Apple Peanut Butter Toast', ingredients: ['Whole Wheat Bread', 'Peanut Butter', 'Apple Slices'], steps: ['Toast bread', 'Spread peanut butter', 'Top with apples'], time: '5 mins' },
  { name: 'Curd Rice', ingredients: ['Cooked Rice', 'Curd', 'Mustard Seeds', 'Ginger'], steps: ['Mix rice and curd', 'Temper with mustard and ginger'], time: '10 mins' },
  { name: 'Methi Thepla', ingredients: ['Wheat Flour', 'Fenugreek Leaves', 'Turmeric'], steps: ['Knead dough with methi', 'Roll thin', 'Cook on tawa'], time: '30 mins' },
  { name: 'Watermelon Salad', ingredients: ['Watermelon', 'Mint', 'Feta Cheese'], steps: ['Cube watermelon', 'Add mint and cheese', 'Serve cold'], time: '5 mins' },
  { name: 'Baked Beans on Toast', ingredients: ['Baked Beans', 'Whole Wheat Toast'], steps: ['Heat beans', 'Serve on toast'], time: '5 mins' },
  { name: 'Vegetable Sandwich', ingredients: ['Brown Bread', 'Cucumber', 'Tomato', 'Green Chutney'], steps: ['Apply chutney', 'Layer veggies', 'Toast lightly'], time: '10 mins' },
  { name: 'Corn Salad', ingredients: ['Sweet Corn', 'Bell Pepper', 'Lemon', 'Coriander'], steps: ['Steam corn', 'Mix with chopped peppers', 'Add lemon'], time: '10 mins' },
  { name: 'Beetroot Juice', ingredients: ['Beetroot', 'Carrot', 'Lemon'], steps: ['Juice veggies', 'Add lemon', 'Serve fresh'], time: '5 mins' },
  { name: 'Avocado Toast', ingredients: ['Whole Wheat Bread', 'Avocado', 'Red Pepper Flakes'], steps: ['Toast bread', 'Mash avocado', 'Spread and season'], time: '5 mins' },
  { name: 'Pumpkin Soup', ingredients: ['Pumpkin', 'Onion', 'Garlic', 'Cream (Optional)'], steps: ['Roast pumpkin', 'Sauté onion/garlic', 'Blend and simmer'], time: '30 mins' },
  { name: 'Greek Yogurt Parfait', ingredients: ['Greek Yogurt', 'Granola', 'Berries'], steps: ['Layer yogurt', 'Add granola and berries'], time: '5 mins' },
  { name: 'Steamed Broccoli', ingredients: ['Broccoli', 'Garlic', 'Lemon'], steps: ['Steam broccoli', 'Toss with garlic and lemon'], time: '10 mins' },
  { name: 'Hummus with Carrots', ingredients: ['Chickpeas', 'Tahini', 'Garlic', 'Carrot Sticks'], steps: ['Blend chickpeas/tahini/garlic', 'Serve with carrots'], time: '10 mins' },
  { name: 'Zucchini Noodles', ingredients: ['Zucchini', 'Pesto Sauce', 'Cherry Tomatoes'], steps: ['Spiralize zucchini', 'Sauté lightly', 'Mix with pesto'], time: '15 mins' },
  { name: 'Chia Seed Pudding', ingredients: ['Chia Seeds', 'Milk', 'Honey', 'Vanilla'], steps: ['Mix ingredients', 'Refrigerate overnight'], time: '5 mins' },
  { name: 'Roasted Chickpeas', ingredients: ['Chickpeas', 'Olive Oil', 'Paprika'], steps: ['Coat chickpeas with oil/spices', 'Bake until crunchy'], time: '30 mins' },
  { name: 'Stuffed Bell Peppers', ingredients: ['Bell Peppers', 'Quinoa', 'Black Beans'], steps: ['Stuff peppers', 'Bake until soft'], time: '40 mins' },
  { name: 'Eggplant Roast', ingredients: ['Eggplant', 'Garlic', 'Olive Oil'], steps: ['Slice eggplant', 'Roast with garlic'], time: '25 mins' },
  { name: 'Lentil Pasta', ingredients: ['Lentil Pasta', 'Marinara Sauce', 'Spinach'], steps: ['Cook pasta', 'Add sauce and spinach'], time: '15 mins' },
  { name: 'Berry Smoothie Bowl', ingredients: ['Mixed Berries', 'Banana', 'Almond Milk'], steps: ['Blend thick', 'Top with nuts and seeds'], time: '10 mins' },
  { name: 'Cauliflower Rice', ingredients: ['Cauliflower', 'Peas', 'Soy Sauce'], steps: ['Grate cauliflower', 'Sauté with peas', 'Add sauce'], time: '15 mins' },
  { name: 'Baked Salmon', ingredients: ['Salmon', 'Lemon', 'Dill'], steps: ['Season salmon', 'Bake at 400F'], time: '20 mins' },
  { name: 'Turkey Wrap', ingredients: ['Whole Wheat Wrap', 'Turkey Slices', 'Spinach'], steps: ['Assemble wrap', 'Serve cold'], time: '5 mins' },
  { name: 'Chicken Salad', ingredients: ['Grilled Chicken', 'Celery', 'Greek Yogurt'], steps: ['Mix chopped chicken with celery/yogurt'], time: '15 mins' },
  { name: 'Miso Soup', ingredients: ['Miso Paste', 'Tofu', 'Seaweed', 'Green Onion'], steps: ['Boil water', 'Dissolve miso', 'Add tofu and seaweed'], time: '10 mins' },
  { name: 'Lentil Tacos', ingredients: ['Lentils', 'Taco Shells', 'Avocado', 'Salsa'], steps: ['Cook lentils with spices', 'Fill shells', 'Top with avocado and salsa'], time: '20 mins' },
  { name: 'Stuffed Mushrooms', ingredients: ['Mushrooms', 'Spinach', 'Garlic', 'Breadcrumbs'], steps: ['Remove stems', 'Sauté spinach/garlic', 'Stuff and bake'], time: '25 mins' },
  { name: 'Vegetable Paella', ingredients: ['Rice', 'Saffron', 'Peas', 'Bell Peppers'], steps: ['Sauté veggies', 'Add rice and saffron water', 'Simmer until cooked'], time: '35 mins' }
];

const IT_LIFESTYLE = [
  { title: 'Office Stress', tips: ['Every 60 mins: Stand for 2 mins', 'Stretch shoulders', 'Drink water'] },
  { title: 'Eye Protection', tips: ['20-20-20 Rule', 'Every 20 mins, look 20 feet away for 20 seconds'] },
  { title: 'Digital Detox', tips: ['After 9 PM: No social media', 'Avoid office emails', 'Limit mobile usage'] },
  { title: 'Sleep Optimization', tips: ['Sleep by 10:30 PM', 'Wake by 5:30 AM', 'Min 7 hours sleep'] },
];

const SKILL_ROADMAP = [
  { id: '1', name: 'AWS Certified Solutions Architect', status: 'In Progress', progress: 45, icon: <Award className="w-5 h-5" /> },
  { id: '2', name: 'Kubernetes (CKA)', status: 'Planned', progress: 0, icon: <Award className="w-5 h-5" /> },
  { id: '3', name: 'Python for Automation', status: 'Completed', progress: 100, icon: <Award className="w-5 h-5" /> },
  { id: '4', name: 'Terraform Associate', status: 'In Progress', progress: 20, icon: <Award className="w-5 h-5" /> },
];

// --- Components ---

const SidebarItem = ({ icon, label, active, onClick, darkMode }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void, darkMode: boolean }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      active 
        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' 
        : darkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
    }`}
  >
    {icon}
    <span className="font-medium text-sm">{label}</span>
  </button>
);

const Card = ({ children, title, icon, darkMode }: { children: React.ReactNode, title: string, icon?: React.ReactNode, key?: React.Key, darkMode?: boolean }) => (
  <div className={`${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} rounded-2xl p-6 shadow-sm border h-full`}>
    <div className="flex items-center gap-2 mb-4">
      {icon && <div className={`p-2 ${darkMode ? 'bg-emerald-900/30 text-emerald-400' : 'bg-emerald-50 text-emerald-600'} rounded-lg`}>{icon}</div>}
      <h3 className={`font-semibold ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>{title}</h3>
    </div>
    {children}
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('lifeos_darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [lang, setLang] = useState<'en' | 'hi'>(() => {
    const saved = localStorage.getItem('lifeos_lang');
    return (saved as 'en' | 'hi') || 'en';
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const t = translations[lang];
  
  // --- 20-20-20 Timer State ---
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes in seconds
  const [timerType, setTimerType] = useState<'work' | 'break'>('work');

  // --- AI Coach State ---
  const [aiInsight, setAiInsight] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  // --- New State for Trackers ---
  const [habits, setHabits] = useState<Record<string, boolean[]>>(() => {
    const saved = localStorage.getItem('lifeos_habits');
    return saved ? JSON.parse(saved) : {
      'Water (3L)': new Array(365).fill(false),
      'Workout': new Array(365).fill(false),
      'Meditation': new Array(365).fill(false),
      'No Junk Food': new Array(365).fill(false),
    };
  });

  const [mealPlan, setMealPlan] = useState(() => {
    const saved = localStorage.getItem('lifeos_mealPlan');
    return saved ? JSON.parse(saved) : DIET_PLAN;
  });

  const [fitnessLogs, setFitnessLogs] = useState<FitnessLog[]>(() => {
    const saved = localStorage.getItem('lifeos_fitnessLogs');
    return saved ? JSON.parse(saved) : [];
  });

  const [goals, setGoals] = useState<Goal[]>(() => {
    const saved = localStorage.getItem('lifeos_goals');
    return saved ? JSON.parse(saved) : [
      { id: '1', title: 'Learn Cloud Automation', progress: 0, category: 'Skill' },
      { id: '2', title: 'Lose 2kg Weight', progress: 0, category: 'Fitness' },
      { id: '3', title: 'Read 2 Books', progress: 0, category: 'Personal' },
    ];
  });

  const [journal, setJournal] = useState(() => {
    const saved = localStorage.getItem('lifeos_journal');
    return saved ? JSON.parse(saved) : { morning: '', night: '' };
  });

  const [waterIntake, setWaterIntake] = useState(() => {
    const saved = localStorage.getItem('lifeos_waterIntake');
    return saved ? JSON.parse(saved) : 0;
  });

  const [sleepLogs, setSleepLogs] = useState<SleepLog[]>(() => {
    const saved = localStorage.getItem('lifeos_sleepLogs');
    return saved ? JSON.parse(saved) : [];
  });

  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('lifeos_notes');
    return saved ? JSON.parse(saved) : [];
  });

  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('lifeos_expenses');
    return saved ? JSON.parse(saved) : [];
  });

  const [bodyMetrics, setBodyMetrics] = useState<BodyMetric[]>(() => {
    const saved = localStorage.getItem('lifeos_bodyMetrics');
    return saved ? JSON.parse(saved) : [];
  });

  const [big3Tasks, setBig3Tasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('lifeos_big3Tasks');
    return saved ? JSON.parse(saved) : [
      { id: '1', title: '', completed: false },
      { id: '2', title: '', completed: false },
      { id: '3', title: '', completed: false },
    ];
  });

  const [pomodoroTime, setPomodoroTime] = useState(1500); // 25 mins
  const [pomodoroActive, setPomodoroActive] = useState(false);
  const [pomodoroMode, setPomodoroMode] = useState<'work' | 'short' | 'long'>('work');

  const [selectedExercise, setSelectedExercise] = useState<string>('Idle');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  // --- Persistence Effects ---
  React.useEffect(() => {
    localStorage.setItem('lifeos_darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  React.useEffect(() => {
    localStorage.setItem('lifeos_lang', lang);
  }, [lang]);

  React.useEffect(() => {
    localStorage.setItem('lifeos_habits', JSON.stringify(habits));
  }, [habits]);

  React.useEffect(() => {
    localStorage.setItem('lifeos_mealPlan', JSON.stringify(mealPlan));
  }, [mealPlan]);

  React.useEffect(() => {
    localStorage.setItem('lifeos_fitnessLogs', JSON.stringify(fitnessLogs));
  }, [fitnessLogs]);

  React.useEffect(() => {
    localStorage.setItem('lifeos_goals', JSON.stringify(goals));
  }, [goals]);

  React.useEffect(() => {
    localStorage.setItem('lifeos_journal', JSON.stringify(journal));
  }, [journal]);

  React.useEffect(() => {
    localStorage.setItem('lifeos_waterIntake', JSON.stringify(waterIntake));
  }, [waterIntake]);

  React.useEffect(() => {
    localStorage.setItem('lifeos_sleepLogs', JSON.stringify(sleepLogs));
  }, [sleepLogs]);

  React.useEffect(() => {
    localStorage.setItem('lifeos_notes', JSON.stringify(notes));
  }, [notes]);

  React.useEffect(() => {
    localStorage.setItem('lifeos_expenses', JSON.stringify(expenses));
  }, [expenses]);

  React.useEffect(() => {
    localStorage.setItem('lifeos_bodyMetrics', JSON.stringify(bodyMetrics));
  }, [bodyMetrics]);

  React.useEffect(() => {
    localStorage.setItem('lifeos_big3Tasks', JSON.stringify(big3Tasks));
  }, [big3Tasks]);

  // --- 20-20-20 Timer Logic ---
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (timerType === 'work') {
        alert("Time for a 20-second eye break! Look 20 feet away.");
        setTimerType('break');
        setTimeLeft(20);
      } else {
        alert("Break over! Back to work.");
        setTimerType('work');
        setTimeLeft(1200);
      }
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft, timerType]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // --- AI Coach Logic ---
  const generateAIInsight = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const model = "gemini-3-flash-preview";
      const prompt = `As a health and productivity coach for an IT professional named Rajesh Sharma, analyze this data and provide 3 actionable insights:
      - Habits: ${(Object.entries(habits) as [string, boolean[]][]).map(([name, data]) => `${name}: ${data.filter(Boolean).length}/365`).join(', ')}
      - Latest Weight: ${fitnessLogs[0]?.weight}kg
      - Goals: ${goals.map(g => `${g.title} (${g.progress}%)`).join(', ')}
      Keep it encouraging and professional.`;
      
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
      });
      setAiInsight(response.text || 'No insights available at the moment.');
    } catch (error) {
      console.error('AI Error:', error);
      setAiInsight('Failed to connect to the AI Coach. Please check your connection.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExportPDF = () => {
    window.print();
  };

  // --- Form States ---
  const [newHabitName, setNewHabitName] = useState('');
  const [showAddHabit, setShowAddHabit] = useState(false);

  const [newGoal, setNewGoal] = useState({ title: '', category: 'Skill', progress: 0 });
  const [showAddGoal, setShowAddGoal] = useState(false);

  const [newLog, setNewLog] = useState({ weight: 74.5, workout: '', notes: '' });
  const [showAddLog, setShowAddLog] = useState(false);

  const toggleHabit = (habitName: string, dayIndex: number) => {
    setHabits(prev => ({
      ...prev,
      [habitName]: prev[habitName].map((val, i) => i === dayIndex ? !val : val)
    }));
  };

  const updateMeal = (dayIndex: number, mealType: 'breakfast' | 'lunch' | 'dinner', value: string) => {
    const newPlan = [...mealPlan];
    newPlan[dayIndex] = { ...newPlan[dayIndex], [mealType]: value };
    setMealPlan(newPlan);
  };

  const addFitnessLog = (log: FitnessLog) => {
    setFitnessLogs([log, ...fitnessLogs]);
    setShowAddLog(false);
    setNewLog({ weight: 74.5, workout: '', notes: '' });
  };

  const handleAddHabit = () => {
    if (!newHabitName.trim()) return;
    setHabits(prev => ({
      ...prev,
      [newHabitName]: new Array(365).fill(false)
    }));
    setNewHabitName('');
    setShowAddHabit(false);
  };

  const handleAddGoal = () => {
    if (!newGoal.title.trim()) return;
    const goal: Goal = {
      id: Math.random().toString(36).substr(2, 9),
      title: newGoal.title,
      category: newGoal.category,
      progress: newGoal.progress
    };
    setGoals([...goals, goal]);
    setNewGoal({ title: '', category: 'Skill', progress: 0 });
    setShowAddGoal(false);
  };

  // --- Pomodoro Timer Logic ---
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (pomodoroActive && pomodoroTime > 0) {
      interval = setInterval(() => {
        setPomodoroTime((prev) => prev - 1);
      }, 1000);
    } else if (pomodoroTime === 0) {
      setPomodoroActive(false);
      const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
      audio.play().catch(() => {});
      alert(`${pomodoroMode.charAt(0).toUpperCase() + pomodoroMode.slice(1)} session finished!`);
    }
    return () => clearInterval(interval);
  }, [pomodoroActive, pomodoroTime, pomodoroMode]);

  const switchPomodoroMode = (mode: 'work' | 'short' | 'long') => {
    setPomodoroMode(mode);
    setPomodoroActive(false);
    if (mode === 'work') setPomodoroTime(1500);
    else if (mode === 'short') setPomodoroTime(300);
    else if (mode === 'long') setPomodoroTime(900);
  };

  const handleAddNote = (title: string, content: string) => {
    const newNote: Note = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      content,
      date: new Date().toLocaleDateString()
    };
    setNotes([newNote, ...notes]);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  const handleAddExpense = (title: string, amount: number, category: string) => {
    const newExpense: Expense = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      amount,
      category,
      date: new Date().toLocaleDateString()
    };
    setExpenses([newExpense, ...expenses]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const handleAddBodyMetric = (metric: BodyMetric) => {
    setBodyMetrics([metric, ...bodyMetrics]);
  };

  const handleAddSleepLog = (duration: number, quality: SleepLog['quality']) => {
    const newLog: SleepLog = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleDateString(),
      duration,
      quality
    };
    setSleepLogs([newLog, ...sleepLogs]);
  };

  const handleSaveJournal = (type: 'morning' | 'night') => {
    // In a real app, this would save to a database.
    // For now, it's already in state and persisted to localStorage via useEffect.
    alert(`${type === 'morning' ? 'Morning' : 'Night'} journal saved!`);
  };

  const toggleTask = (id: string) => {
    setBig3Tasks(big3Tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const updateTask = (id: string, title: string) => {
    setBig3Tasks(big3Tasks.map(t => t.id === id ? { ...t, title } : t));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card title={t.welcome} icon={<Target className="w-5 h-5" />} darkMode={darkMode}>
              <div className="space-y-4">
                <div className={`p-4 ${darkMode ? 'bg-emerald-900/20 border-emerald-800' : 'bg-emerald-50 border-emerald-100'} rounded-xl border`}>
                  <p className={`text-sm ${darkMode ? 'text-emerald-400' : 'text-emerald-800'} font-medium`}>Daily Goal</p>
                  <p className={`text-2xl font-bold ${darkMode ? 'text-emerald-100' : 'text-emerald-900'}`}>8,000 Steps</p>
                </div>
                <div className={`p-4 ${darkMode ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-100'} rounded-xl border`}>
                  <p className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-800'} font-medium`}>Hydration</p>
                  <p className={`text-2xl font-bold ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>3 Liters</p>
                </div>
                <div className={`p-4 ${darkMode ? 'bg-purple-900/20 border-purple-800' : 'bg-purple-50 border-purple-100'} rounded-xl border`}>
                  <p className={`text-sm ${darkMode ? 'text-purple-400' : 'text-purple-800'} font-medium`}>Sleep Target</p>
                  <p className={`text-2xl font-bold ${darkMode ? 'text-purple-100' : 'text-purple-900'}`}>10:30 PM</p>
                </div>
              </div>
            </Card>

            <Card title="Today's Schedule" icon={<Clock className="w-5 h-5" />} darkMode={darkMode}>
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {DAILY_ROUTINE.slice(0, 8).map((item, i) => (
                  <div key={i} className={`flex items-center gap-3 p-2 ${darkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-50'} rounded-lg transition-colors`}>
                    <span className="text-xs font-mono text-slate-400 w-16">{item.time}</span>
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{item.activity}</span>
                  </div>
                ))}
                <button 
                  onClick={() => setActiveTab('routine')}
                  className="w-full text-center text-sm text-emerald-600 font-medium mt-2 hover:underline"
                >
                  View Full Routine
                </button>
              </div>
            </Card>

            <Card title="Workout Focus" icon={<Dumbbell className="w-5 h-5" />} darkMode={darkMode}>
              <div className={`p-4 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'} rounded-xl border`}>
                <p className={`text-sm font-semibold ${darkMode ? 'text-slate-100' : 'text-slate-900'} mb-2`}>{WORKOUT_PLAN[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1].focus}</p>
                <ul className="space-y-2">
                  {WORKOUT_PLAN[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1].exercises.map((ex, i) => (
                    <li key={i} className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'} flex items-center gap-2`}>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {ex}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            <Card title="IT Wellness" icon={<Monitor className="w-5 h-5" />}>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Eye className="w-5 h-5 text-blue-500 mt-1" />
                  <div>
                    <p className="text-sm font-semibold">20-20-20 Rule</p>
                    <p className="text-xs text-slate-500">Every 20 mins, look 20ft away for 20s.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-amber-500 mt-1" />
                  <div>
                    <p className="text-sm font-semibold">Movement Break</p>
                    <p className="text-xs text-slate-500">Stand every 60 mins for 2 mins.</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card title={t.wellness} icon={<Activity className="w-5 h-5" />} darkMode={darkMode}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Water</span>
                  </div>
                  <span className="text-sm font-bold">{waterIntake} / 12 glasses</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bed className="w-4 h-4 text-purple-500" />
                    <span className="text-sm">Sleep</span>
                  </div>
                  <span className="text-sm font-bold">{sleepLogs[0]?.duration || 0} hrs</span>
                </div>
                <button onClick={() => setActiveTab('wellness')} className="w-full text-center text-xs text-emerald-600 font-bold hover:underline">Log Wellness</button>
              </div>
            </Card>

            <Card title={t.focus} icon={<Timer className="w-5 h-5" />} darkMode={darkMode}>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-black text-emerald-600 font-mono">{formatTime(pomodoroTime)}</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">{pomodoroMode} session</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-400 uppercase">Big 3 Tasks</p>
                  {big3Tasks.map(task => (
                    <div key={task.id} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${task.completed ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                      <span className={`text-xs ${task.completed ? 'line-through text-slate-400' : ''}`}>{task.title || 'Empty task'}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setActiveTab('focus')} className="w-full text-center text-xs text-emerald-600 font-bold hover:underline">Start Focus Session</button>
              </div>
            </Card>

            <Card title={t.finance} icon={<Wallet className="w-5 h-5" />} darkMode={darkMode}>
              <div className="space-y-4">
                <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
                  <p className="text-xs text-slate-400 uppercase font-bold">Total Expenses (Today)</p>
                  <p className="text-xl font-bold text-red-500">₹{expenses.filter(e => e.date === new Date().toLocaleDateString()).reduce((acc, curr) => acc + curr.amount, 0)}</p>
                </div>
                <div className="space-y-2">
                  {expenses.slice(0, 2).map(exp => (
                    <div key={exp.id} className="flex justify-between text-xs">
                      <span className="text-slate-500">{exp.title}</span>
                      <span className="font-bold">₹{exp.amount}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setActiveTab('finance')} className="w-full text-center text-xs text-emerald-600 font-bold hover:underline">Manage Finance</button>
              </div>
            </Card>
          </div>
        );
      case 'routine':
        return (
          <Card title={t.dailyRoutinePlanner} icon={<Clock className="w-5 h-5" />} darkMode={darkMode}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DAILY_ROUTINE.map((item, i) => (
                <div key={i} className={`flex items-center gap-4 p-3 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'} rounded-xl border`}>
                  <div className={`p-2 ${darkMode ? 'bg-slate-900' : 'bg-white'} rounded-lg shadow-sm text-emerald-600`}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-mono text-slate-400">{item.time}</p>
                    <p className={`text-sm font-medium ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>{item.activity}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        );
      case 'workout':
        return (
          <div className="space-y-8">
            <div className="flex justify-end no-print">
              <button 
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200/50"
              >
                <Download className="w-4 h-4" /> {t.exportPdf}
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card title={t.workout} icon={<Dumbbell className="w-5 h-5" />} darkMode={darkMode}>
                <div className="space-y-6">
                  {WORKOUT_PLAN.map((day, i) => (
                    <div key={i} className={`p-4 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'} rounded-xl border`}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className={`font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-900'}`}>{day.day}</h4>
                        <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">{day.focus}</span>
                      </div>
                      <ul className="space-y-1">
                        {day.exercises.map((ex, j) => (
                          <li key={j} className="text-sm text-slate-500 flex items-center gap-2">
                            <div className="w-1 h-1 bg-emerald-500 rounded-full" /> {ex}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Card>

              <Card title={t.liveWorkout} icon={<Zap className="w-5 h-5" />} darkMode={darkMode}>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    {['Idle', 'Pushups', 'Squats', 'Jumping Jacks'].map((ex) => (
                      <button
                        key={ex}
                        onClick={() => setSelectedExercise(ex)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          selectedExercise === ex 
                            ? 'bg-emerald-600 text-white' 
                            : darkMode ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {ex}
                      </button>
                    ))}
                  </div>
                  <div className="h-[400px] w-full bg-slate-950 rounded-2xl overflow-hidden relative border border-slate-800">
                    <Canvas shadows>
                      <PerspectiveCamera makeDefault position={[0, 2, 5]} />
                      <OrbitControls enableZoom={false} />
                      <ambientLight intensity={0.5} />
                      <pointLight position={[10, 10, 10]} intensity={1} />
                      <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} />
                      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                        <WorkoutModel type={selectedExercise} />
                      </Float>
                      <gridHelper args={[10, 10, 0x10b981, 0x1e293b]} position={[0, -0.1, 0]} />
                    </Canvas>
                    <div className="absolute bottom-4 left-4 right-4 p-4 bg-black/40 backdrop-blur-md rounded-xl border border-white/10">
                      <p className="text-white text-sm font-bold flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        Live Session: {selectedExercise === 'Idle' ? WORKOUT_PLAN[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1].focus : selectedExercise}
                      </p>
                      <p className="text-slate-300 text-xs mt-1">Real-time form tracking enabled</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );
      case 'diet':
        return (
          <div className="space-y-8">
            <div className={`p-6 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} rounded-2xl shadow-sm border`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-bold ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>{t.mealPlanner}</h3>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full font-bold">Editing Enabled</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className={`w-full ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} rounded-2xl overflow-hidden shadow-sm border`}>
                  <thead className={darkMode ? 'bg-slate-800' : 'bg-slate-50'}>
                    <tr>
                      <th className={`px-6 py-4 text-left text-xs font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-500'} uppercase tracking-wider w-32`}>{t.day}</th>
                      <th className={`px-6 py-4 text-left text-xs font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-500'} uppercase tracking-wider`}>{t.breakfast}</th>
                      <th className={`px-6 py-4 text-left text-xs font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-500'} uppercase tracking-wider`}>{t.lunch}</th>
                      <th className={`px-6 py-4 text-left text-xs font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-500'} uppercase tracking-wider`}>{t.dinner}</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${darkMode ? 'divide-slate-800' : 'divide-slate-100'}`}>
                    {mealPlan.map((day, i) => (
                      <tr key={i} className={darkMode ? 'hover:bg-slate-800/50 transition-colors' : 'hover:bg-slate-50 transition-colors'}>
                        <td className={`px-6 py-4 text-sm font-bold ${darkMode ? 'text-slate-300' : 'text-slate-900'}`}>{day.day}</td>
                        <td className="px-4 py-2">
                          <input 
                            type="text" 
                            value={day.breakfast} 
                            onChange={(e) => updateMeal(i, 'breakfast', e.target.value)}
                            className={`w-full bg-transparent border-none focus:ring-2 focus:ring-emerald-500 rounded px-2 py-1 text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input 
                            type="text" 
                            value={day.lunch} 
                            onChange={(e) => updateMeal(i, 'lunch', e.target.value)}
                            className={`w-full bg-transparent border-none focus:ring-2 focus:ring-emerald-500 rounded px-2 py-1 text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input 
                            type="text" 
                            value={day.dinner} 
                            onChange={(e) => updateMeal(i, 'dinner', e.target.value)}
                            className={`w-full bg-transparent border-none focus:ring-2 focus:ring-emerald-500 rounded px-2 py-1 text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className={`mt-6 p-6 ${darkMode ? 'bg-emerald-900/40 border-emerald-800' : 'bg-emerald-900 border-emerald-800'} text-white rounded-2xl shadow-xl`}>
                <div className="flex items-center gap-3 mb-4">
                  <ChefHat className="w-6 h-6" />
                  <h4 className="text-lg font-bold">Cooking Tip of the Week</h4>
                </div>
                <p className="text-emerald-100 leading-relaxed">
                  "Prep your vegetables for the entire week on Sunday evening. Pre-chopped carrots, beans, and onions can save you 15 minutes of cooking time every day, making it easier to stick to your healthy home-cooked meals."
                </p>
              </div>
            </div>
          </div>
        );
      case 'recipes':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RECIPES.map((recipe, i) => (
              <Card key={i} title={recipe.name} icon={<ChefHat className="w-5 h-5" />} darkMode={darkMode}>
                <div className="flex gap-2 mb-4">
                  <span className={`px-2 py-1 ${darkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'} text-xs rounded-md font-medium`}>{recipe.time}</span>
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-600 text-xs rounded-md font-medium">Healthy</span>
                </div>
                <div className="mb-4">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Ingredients</p>
                  <div className="flex flex-wrap gap-2">
                    {recipe.ingredients.map((ing, j) => (
                      <span key={j} className={`px-2 py-1 ${darkMode ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'} text-xs rounded-lg border`}>{ing}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Steps</p>
                  <ol className="space-y-2">
                    {recipe.steps.map((step, j) => (
                      <li key={j} className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'} flex gap-2`}>
                        <span className="font-bold text-emerald-500">{j + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </Card>
            ))}
          </div>
        );
      case 'wellness':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card title={t.waterTracker} icon={<Droplets className="w-5 h-5" />} darkMode={darkMode}>
                <div className="flex flex-col items-center gap-6">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100 dark:text-slate-800" />
                      <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={364.4} strokeDashoffset={364.4 - (Math.min(waterIntake, 12) / 12) * 364.4} className="text-blue-500 transition-all duration-500" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-black text-blue-600">{waterIntake}</span>
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Glasses</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setWaterIntake(Math.max(0, waterIntake - 1))} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"><Minus className="w-4 h-4" /></button>
                    <button onClick={() => setWaterIntake(waterIntake + 1)} className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"><Plus className="w-4 h-4" /></button>
                  </div>
                  <p className="text-xs text-slate-500 text-center italic">"Stay hydrated for better focus and energy."</p>
                </div>
              </Card>

              <Card title={t.sleepLog} icon={<Bed className="w-5 h-5" />} darkMode={darkMode}>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800">
                      <p className="text-[10px] text-purple-600 uppercase font-bold">Avg Duration</p>
                      <p className="text-lg font-bold">7.2 hrs</p>
                    </div>
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800">
                      <p className="text-[10px] text-emerald-600 uppercase font-bold">Avg Quality</p>
                      <p className="text-lg font-bold">8/10</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-400 uppercase">Recent Logs</p>
                    {sleepLogs.slice(0, 3).map((log, i) => (
                      <div key={i} className="flex justify-between text-sm p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <span className="text-slate-500">{log.date}</span>
                        <span className="font-bold">{log.duration}h • Q:{log.quality}</span>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => {
                      const duration = parseFloat(prompt("Enter sleep duration (hours):") || "0");
                      const quality = prompt("Enter sleep quality (Excellent/Good/Fair/Poor):") as SleepLog['quality'];
                      if (duration > 0 && quality) {
                        handleAddSleepLog(duration, quality);
                      }
                    }}
                    className="w-full py-2 bg-purple-600 text-white text-sm font-bold rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Log Sleep
                  </button>
                </div>
              </Card>

              <Card title={t.breathingTool} icon={<Wind className="w-5 h-5" />} darkMode={darkMode}>
                <div className="flex flex-col items-center gap-6">
                  <motion.div 
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="w-24 h-24 bg-emerald-400/20 rounded-full flex items-center justify-center border-2 border-emerald-400"
                  >
                    <div className="w-12 h-12 bg-emerald-500 rounded-full animate-pulse" />
                  </motion.div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-emerald-600">Inhale... Exhale...</p>
                    <p className="text-xs text-slate-500 mt-1">Follow the circle for 2 mins to reset.</p>
                  </div>
                  <button className="px-6 py-2 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all">Start Session</button>
                </div>
              </Card>
            </div>
          </div>
        );
      case 'focus':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card title={t.pomodoroTimer} icon={<Timer className="w-5 h-5" />} darkMode={darkMode}>
                <div className="flex flex-col items-center gap-8">
                  <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                    {(['work', 'short', 'long'] as const).map(mode => (
                      <button 
                        key={mode}
                        onClick={() => switchPomodoroMode(mode)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${pomodoroMode === mode ? 'bg-white dark:bg-slate-700 text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                  <div className="text-center">
                    <p className="text-7xl font-black text-emerald-600 font-mono tracking-tighter">{formatTime(pomodoroTime)}</p>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-2">{pomodoroMode} session</p>
                  </div>
                  <div className="flex gap-4 w-full">
                    <button 
                      onClick={() => setPomodoroActive(!pomodoroActive)}
                      className={`flex-1 py-3 rounded-xl font-black text-sm uppercase tracking-widest transition-all ${pomodoroActive ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200'}`}
                    >
                      {pomodoroActive ? 'Pause' : 'Start'}
                    </button>
                    <button 
                      onClick={() => switchPomodoroMode(pomodoroMode)}
                      className={`p-3 rounded-xl ${darkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'} hover:bg-slate-200 transition-all`}
                    >
                      <RefreshCw className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </Card>

              <div className="lg:col-span-2">
                <Card title={t.dailyBig3Tasks} icon={<ListTodo className="w-5 h-5" />} darkMode={darkMode}>
                  <div className="space-y-6">
                    <p className="text-sm text-slate-500 italic">"What are the 3 most important things you must finish today?"</p>
                    <div className="space-y-4">
                      {big3Tasks.map((task, i) => (
                        <div key={task.id} className={`flex items-center gap-4 p-4 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'} rounded-2xl border transition-all ${task.completed ? 'opacity-50' : ''}`}>
                          <button 
                            onClick={() => toggleTask(task.id)}
                            className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${task.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300'}`}
                          >
                            {task.completed && <Check className="w-4 h-4" />}
                          </button>
                          <input 
                            type="text" 
                            value={task.title}
                            placeholder={`Task ${i + 1}...`}
                            onChange={(e) => updateTask(task.id, e.target.value)}
                            className={`flex-1 bg-transparent border-none focus:ring-0 text-sm font-bold ${darkMode ? 'text-slate-100' : 'text-slate-800'} ${task.completed ? 'line-through text-slate-400' : ''}`}
                          />
                        </div>
                      ))}
                    </div>
                    <div className={`p-4 ${darkMode ? 'bg-emerald-900/20 border-emerald-800' : 'bg-emerald-50 border-emerald-100'} rounded-xl border`}>
                      <p className="text-xs text-emerald-600 font-bold uppercase mb-1">Productivity Rule</p>
                      <p className="text-sm text-slate-500">Eat the frog: Do your hardest task first thing in the morning.</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        );
      case 'wellness':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card title="Water Tracker" icon={<Droplets className="w-5 h-5" />} darkMode={darkMode}>
                <div className="flex flex-col items-center py-6">
                  <div className="relative w-40 h-40 flex items-center justify-center mb-6">
                    <svg className="w-full h-full -rotate-90">
                      <circle cx="80" cy="80" r="70" fill="transparent" stroke={darkMode ? '#1e293b' : '#f1f5f9'} strokeWidth="12" />
                      <circle 
                        cx="80" cy="80" r="70" fill="transparent" stroke="#3b82f6" strokeWidth="12" 
                        strokeDasharray={440} strokeDashoffset={440 - (Math.min(waterIntake / 3000, 1) * 440)}
                        strokeLinecap="round" className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-black text-blue-500">{waterIntake}</span>
                      <span className="text-[10px] text-slate-400 uppercase font-bold">ml / 3000ml</span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => setWaterIntake(prev => Math.max(0, prev - 250))} className={`p-3 rounded-xl ${darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'} transition-colors`}>-250ml</button>
                    <button onClick={() => setWaterIntake(prev => prev + 250)} className="p-3 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-colors">+250ml</button>
                  </div>
                </div>
              </Card>

              <Card title="Sleep Log" icon={<Bed className="w-5 h-5" />} darkMode={darkMode}>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className={`p-4 rounded-xl ${darkMode ? 'bg-slate-800' : 'bg-slate-50'}`}>
                      <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Avg Duration</p>
                      <p className="text-xl font-black">7.2h</p>
                    </div>
                    <div className={`p-4 rounded-xl ${darkMode ? 'bg-slate-800' : 'bg-slate-50'}`}>
                      <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Avg Quality</p>
                      <p className="text-xl font-black text-emerald-500">Good</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Recent Logs</h4>
                    {sleepLogs.slice(0, 3).map(log => (
                      <div key={log.id} className={`flex items-center justify-between p-3 ${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl border ${darkMode ? 'border-slate-700' : 'border-slate-100'}`}>
                        <span className="text-sm font-bold">{log.date}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-black">{log.duration}h</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold ${
                            log.quality === 'Excellent' ? 'bg-emerald-100 text-emerald-600' :
                            log.quality === 'Good' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'
                          }`}>{log.quality}</span>
                        </div>
                      </div>
                    ))}
                    <button 
                      onClick={() => {
                        const d = parseFloat(prompt("Hours slept:") || "0");
                        const q = prompt("Quality (Excellent/Good/Fair/Poor):") as SleepLog['quality'];
                        if (d > 0 && q) handleAddSleepLog(d, q);
                      }}
                      className="w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-xs font-bold text-slate-400 hover:border-emerald-500 hover:text-emerald-500 transition-all"
                    >
                      + Add Sleep Log
                    </button>
                  </div>
                </div>
              </Card>

              <Card title="Mindfulness Breathing" icon={<Wind className="w-5 h-5" />} darkMode={darkMode}>
                <div className="flex flex-col items-center py-10">
                  <motion.div 
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="w-24 h-24 rounded-full bg-emerald-500/20 border-4 border-emerald-500 flex items-center justify-center mb-8"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-500/40" />
                  </motion.div>
                  <p className="text-lg font-bold text-emerald-500 mb-2">Inhale... Exhale...</p>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'} text-center max-w-xs`}>Follow the circle to regulate your breathing and reduce stress levels.</p>
                </div>
              </Card>
            </div>
          </div>
        );
      case 'focus':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card title="Pomodoro Timer" icon={<Timer className="w-5 h-5" />} darkMode={darkMode}>
                <div className="flex flex-col items-center py-8">
                  <div className="flex gap-2 mb-8">
                    {(['work', 'short', 'long'] as const).map(mode => (
                      <button 
                        key={mode}
                        onClick={() => setPomodoroMode(mode)}
                        className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all ${
                          pomodoroMode === mode 
                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30' 
                            : `${darkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'} hover:bg-slate-200`
                        }`}
                      >
                        {mode.replace('-', ' ')}
                      </button>
                    ))}
                  </div>
                  <div className="text-7xl font-black tracking-tighter mb-8 tabular-nums">
                    {formatTime(pomodoroTime)}
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setPomodoroActive(!pomodoroActive)}
                      className={`px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
                        pomodoroActive 
                          ? 'bg-red-500 text-white hover:bg-red-600' 
                          : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xl shadow-emerald-500/20'
                      }`}
                    >
                      {pomodoroActive ? 'Pause' : 'Start Focus'}
                    </button>
                    <button 
                      onClick={() => {
                        setPomodoroActive(false);
                        setPomodoroTime(pomodoroMode === 'work' ? 25 * 60 : pomodoroMode === 'short' ? 5 * 60 : 15 * 60);
                      }}
                      className={`p-3 rounded-2xl ${darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'} transition-colors`}
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </Card>

              <Card title="Daily Big 3 Tasks" icon={<ListTodo className="w-5 h-5" />} darkMode={darkMode}>
                <div className="space-y-6">
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Focus on the three most important tasks that will move the needle today.</p>
                  <div className="space-y-4">
                    {big3Tasks.map(task => (
                      <div key={task.id} className={`flex items-center gap-4 p-4 rounded-2xl border ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-100'} transition-all ${task.completed ? 'opacity-50' : ''}`}>
                        <button 
                          onClick={() => toggleTask(task.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            task.completed ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300'
                          }`}
                        >
                          {task.completed && <Check className="w-4 h-4 text-white" />}
                        </button>
                        <input 
                          type="text" 
                          value={task.title}
                          onChange={(e) => updateTask(task.id, e.target.value)}
                          placeholder="Set a priority task..."
                          className={`bg-transparent border-none outline-none text-sm font-bold flex-1 ${task.completed ? 'line-through' : ''}`}
                        />
                      </div>
                    ))}
                  </div>
                  <div className={`p-4 rounded-xl ${darkMode ? 'bg-emerald-500/10' : 'bg-emerald-50'} border border-emerald-500/20`}>
                    <div className="flex gap-3">
                      <Zap className="w-4 h-4 text-emerald-500 shrink-0" />
                      <p className="text-sm text-slate-500">Eat the frog: Do your hardest task first thing in the morning.</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );
      case 'notes':
        return (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Second Brain</h3>
              <button 
                onClick={() => {
                  const title = prompt("Note Title:");
                  const content = prompt("Note Content:");
                  if (title && content) handleAddNote(title, content);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-bold rounded-xl hover:bg-emerald-700 transition-colors"
              >
                <Plus className="w-4 h-4" /> New Note
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map(note => (
                <Card key={note.id} title={note.title} icon={<StickyNote className="w-5 h-5" />} darkMode={darkMode}>
                  <div className="flex flex-col h-full">
                    <p className={`text-xs text-slate-400 mb-4`}>{note.date}</p>
                    <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'} flex-1 line-clamp-6`}>{note.content}</p>
                    <div className="mt-4 flex justify-end">
                      <button onClick={() => handleDeleteNote(note.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                </Card>
              ))}
              {notes.length === 0 && (
                <div className="col-span-full py-20 text-center">
                  <StickyNote className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                  <p className="text-slate-400">Your second brain is empty. Start capturing ideas!</p>
                </div>
              )}
            </div>
          </div>
        );
      case 'finance':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card title="Expense Tracker" icon={<Wallet className="w-5 h-5" />} darkMode={darkMode}>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <input id="exp-title" type="text" placeholder="Expense title..." className={`w-full px-3 py-2 ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'} rounded-lg text-sm`} />
                    <div className="flex gap-2">
                      <input id="exp-amount" type="number" placeholder="Amount ₹" className={`flex-1 px-3 py-2 ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'} rounded-lg text-sm`} />
                      <select id="exp-cat" className={`w-32 px-3 py-2 ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'} rounded-lg text-sm`}>
                        <option>Food</option>
                        <option>Travel</option>
                        <option>Bills</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <button 
                      onClick={() => {
                        const t = (document.getElementById('exp-title') as HTMLInputElement).value;
                        const a = parseFloat((document.getElementById('exp-amount') as HTMLInputElement).value);
                        const c = (document.getElementById('exp-cat') as HTMLSelectElement).value;
                        if (t && a > 0) {
                          handleAddExpense(t, a, c);
                          (document.getElementById('exp-title') as HTMLInputElement).value = '';
                          (document.getElementById('exp-amount') as HTMLInputElement).value = '';
                        }
                      }}
                      className="w-full py-2 bg-emerald-600 text-white text-sm font-bold rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      Add Expense
                    </button>
                  </div>
                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {expenses.map(exp => (
                      <div key={exp.id} className={`flex items-center justify-between p-3 ${darkMode ? 'bg-slate-800' : 'bg-slate-50'} rounded-xl`}>
                        <div>
                          <p className="text-sm font-bold">{exp.title}</p>
                          <p className="text-[10px] text-slate-400 uppercase font-bold">{exp.category} • {exp.date}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-black text-red-500">₹{exp.amount}</span>
                          <button onClick={() => handleDeleteExpense(exp.id)} className="text-slate-400 hover:text-red-500"><Trash2 className="w-3 h-3" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              <div className="lg:col-span-2 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className={`p-6 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} rounded-2xl border shadow-sm`}>
                    <p className="text-xs text-slate-400 uppercase font-bold mb-1">Daily Spend</p>
                    <p className="text-2xl font-black text-red-500">₹{expenses.filter(e => e.date === new Date().toLocaleDateString()).reduce((acc, curr) => acc + curr.amount, 0)}</p>
                  </div>
                  <div className={`p-6 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} rounded-2xl border shadow-sm`}>
                    <p className="text-xs text-slate-400 uppercase font-bold mb-1">Monthly Total</p>
                    <p className="text-2xl font-black text-emerald-600">₹{expenses.reduce((acc, curr) => acc + curr.amount, 0)}</p>
                  </div>
                  <div className={`p-6 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} rounded-2xl border shadow-sm`}>
                    <p className="text-xs text-slate-400 uppercase font-bold mb-1">Transactions</p>
                    <p className="text-2xl font-black text-blue-600">{expenses.length}</p>
                  </div>
                </div>
                <Card title="Expense Analytics" icon={<BarChart3 className="w-5 h-5" />} darkMode={darkMode}>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={Object.entries(expenses.reduce((acc, curr) => {
                        acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
                        return acc;
                      }, {} as Record<string, number>)).map(([name, value]) => ({ name, value }))}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? '#334155' : '#e2e8f0'} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: darkMode ? '#94a3b8' : '#64748b' }} />
                        <YAxis hide />
                        <Tooltip 
                          cursor={{ fill: 'transparent' }}
                          contentStyle={{ backgroundColor: darkMode ? '#0f172a' : '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                        />
                        <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        );
      case 'it-lifestyle':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {IT_LIFESTYLE.map((item, i) => (
              <Card key={i} title={item.title} icon={<Monitor className="w-5 h-5" />} darkMode={darkMode}>
                <ul className="space-y-3">
                  {item.tips.map((tip, j) => (
                    <li key={j} className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'} flex items-start gap-3`}>
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        );
      case 'trackers':
        return (
          <div className="space-y-10">
            {/* 365-Day Habit Tracker */}
            <Card title={t.habitTracker} icon={<History className="w-5 h-5" />} darkMode={darkMode}>
              <div className="space-y-8">
                <div className="flex justify-between items-center mb-4">
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Track your consistency over the year.</p>
                  <button 
                    onClick={() => setShowAddHabit(!showAddHabit)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    <Plus className="w-3 h-3" /> {t.add}
                  </button>
                </div>

                {showAddHabit && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className={`p-4 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'} rounded-xl border mb-6 flex gap-2`}
                  >
                    <input 
                      type="text" 
                      placeholder="Enter habit name..." 
                      value={newHabitName}
                      onChange={(e) => setNewHabitName(e.target.value)}
                      className={`flex-1 px-3 py-2 ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200'} rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none`}
                    />
                    <button 
                      onClick={handleAddHabit}
                      className="px-4 py-2 bg-emerald-600 text-white text-sm font-bold rounded-lg"
                    >
                      {t.add}
                    </button>
                  </motion.div>
                )}

                {(Object.entries(habits) as [string, boolean[]][]).map(([name, data], i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm font-bold ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{name}</span>
                      <span className="text-xs text-slate-400">
                        {data.filter(Boolean).length} / 365 days completed
                      </span>
                    </div>
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(12px,1fr))] gap-1">
                      {data.map((done, j) => (
                        <button
                          key={j}
                          onClick={() => toggleHabit(name, j)}
                          title={`Day ${j + 1}`}
                          className={`w-3 h-3 rounded-sm transition-all duration-200 ${
                            done 
                              ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' 
                              : darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Monthly Goal Tracker */}
              <Card title={t.goalTracker} icon={<Target className="w-5 h-5" />} darkMode={darkMode}>
                <div className="space-y-6">
                  {showAddGoal && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'} rounded-xl border space-y-3`}
                    >
                      <input 
                        type="text" 
                        placeholder="Goal title..." 
                        value={newGoal.title}
                        onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                        className={`w-full px-3 py-2 ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200'} rounded-lg text-sm`}
                      />
                      <div className="flex gap-2">
                        <select 
                          value={newGoal.category}
                          onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
                          className={`flex-1 px-3 py-2 ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200'} rounded-lg text-sm`}
                        >
                          <option>Skill</option>
                          <option>Fitness</option>
                          <option>Personal</option>
                          <option>Work</option>
                        </select>
                        <input 
                          type="number" 
                          placeholder="Progress %" 
                          value={newGoal.progress}
                          onChange={(e) => setNewGoal({...newGoal, progress: parseInt(e.target.value) || 0})}
                          className={`w-24 px-3 py-2 ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200'} rounded-lg text-sm`}
                        />
                      </div>
                      <div className="flex gap-2">
                        <button onClick={handleAddGoal} className="flex-1 py-2 bg-emerald-600 text-white text-sm font-bold rounded-lg">{t.save}</button>
                        <button onClick={() => setShowAddGoal(false)} className={`px-4 py-2 ${darkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-600'} text-sm font-bold rounded-lg`}>{t.cancel}</button>
                      </div>
                    </motion.div>
                  )}

                  {goals.map((goal) => (
                    <div key={goal.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`text-sm font-bold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>{goal.title}</p>
                          <p className="text-xs text-slate-400">{goal.category}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <input 
                            type="number" 
                            value={goal.progress}
                            onChange={(e) => {
                              const val = Math.min(100, Math.max(0, parseInt(e.target.value) || 0));
                              setGoals(goals.map(g => g.id === goal.id ? { ...g, progress: val } : g));
                            }}
                            className={`w-12 text-right text-sm font-bold text-emerald-600 bg-transparent border-none focus:ring-0`}
                          />
                          <span className="text-sm font-bold text-emerald-600">%</span>
                        </div>
                      </div>
                      <div className={`w-full ${darkMode ? 'bg-slate-800' : 'bg-slate-100'} h-2 rounded-full overflow-hidden`}>
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${goal.progress}%` }}
                          className="h-full bg-emerald-500"
                        />
                      </div>
                    </div>
                  ))}
                  {!showAddGoal && (
                    <button 
                      onClick={() => setShowAddGoal(true)}
                      className={`w-full py-3 border-2 border-dashed ${darkMode ? 'border-slate-800 text-slate-500 hover:border-emerald-700' : 'border-slate-200 text-slate-400 hover:border-emerald-300'} rounded-xl text-sm font-medium hover:text-emerald-500 transition-all flex items-center justify-center gap-2`}
                    >
                      <Plus className="w-4 h-4" /> {t.add}
                    </button>
                  )}
                </div>
              </Card>

              {/* Fitness Progress Tracker */}
              <Card title={t.fitnessTracker} icon={<LineChart className="w-5 h-5" />} darkMode={darkMode}>
                <div className="space-y-6">
                  {showAddLog && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`p-4 ${darkMode ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-100'} rounded-xl border space-y-3`}
                    >
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          placeholder="Workout name..." 
                          value={newLog.workout}
                          onChange={(e) => setNewLog({...newLog, workout: e.target.value})}
                          className={`flex-1 px-3 py-2 ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200'} rounded-lg text-sm`}
                        />
                        <input 
                          type="number" 
                          step="0.1"
                          placeholder="Weight kg" 
                          value={newLog.weight}
                          onChange={(e) => setNewLog({...newLog, weight: parseFloat(e.target.value) || 0})}
                          className={`w-24 px-3 py-2 ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200'} rounded-lg text-sm`}
                        />
                      </div>
                      <textarea 
                        placeholder="Notes..." 
                        value={newLog.notes}
                        onChange={(e) => setNewLog({...newLog, notes: e.target.value})}
                        className={`w-full px-3 py-2 ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200'} rounded-lg text-sm h-20 resize-none`}
                      />
                      <div className="flex gap-2">
                        <button 
                          onClick={() => addFitnessLog({ 
                            date: new Date().toISOString().split('T')[0], 
                            weight: newLog.weight, 
                            workout: newLog.workout || 'General Workout', 
                            notes: newLog.notes 
                          })} 
                          className="flex-1 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg"
                        >
                          {t.save}
                        </button>
                        <button onClick={() => setShowAddLog(false)} className={`px-4 py-2 ${darkMode ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-white text-slate-600 border-slate-200'} text-sm font-bold rounded-lg border`}>{t.cancel}</button>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex gap-4 mb-6">
                    <div className={`flex-1 p-4 ${darkMode ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-100'} rounded-2xl border`}>
                      <p className={`text-xs ${darkMode ? 'text-blue-400' : 'text-blue-600'} font-bold uppercase tracking-wider mb-1`}>{t.currentWeight}</p>
                      <p className={`text-2xl font-black ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>74.5 <span className="text-sm font-normal">kg</span></p>
                    </div>
                    <div className={`flex-1 p-4 ${darkMode ? 'bg-emerald-900/20 border-emerald-800' : 'bg-emerald-50 border-emerald-100'} rounded-2xl border`}>
                      <p className={`text-xs ${darkMode ? 'text-emerald-400' : 'text-emerald-600'} font-bold uppercase tracking-wider mb-1`}>{t.workoutsThisMonth}</p>
                      <p className={`text-2xl font-black ${darkMode ? 'text-emerald-100' : 'text-emerald-900'}`}>12 <span className="text-sm font-normal">this month</span></p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                    {fitnessLogs.map((log, i) => (
                      <div key={i} className={`p-4 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'} rounded-xl border flex items-center justify-between`}>
                        <div>
                          <p className="text-xs text-slate-400 font-mono">{log.date}</p>
                          <p className={`text-sm font-bold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>{log.workout}</p>
                          <p className="text-xs text-slate-500 italic">"{log.notes}"</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-blue-600">{log.weight} kg</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => setShowAddLog(true)}
                    className="w-full py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all"
                  >
                    {t.logSession}
                  </button>
                </div>
              </Card>
            </div>

            {/* Morning & Night Journal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card title={t.morningJournal} icon={<Sun className="w-5 h-5" />} darkMode={darkMode}>
                <div className="space-y-4">
                  <p className="text-xs text-slate-400 italic">"What are 3 things you are grateful for today?"</p>
                  <textarea 
                    value={journal.morning}
                    onChange={(e) => setJournal({ ...journal, morning: e.target.value })}
                    placeholder="Start your day with positivity..."
                    className={`w-full h-40 p-4 ${darkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200'} rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm resize-none`}
                  />
                  <button 
                    onClick={() => handleSaveJournal('morning')}
                    className="flex items-center gap-2 text-emerald-600 text-sm font-bold hover:underline"
                  >
                    <Save className="w-4 h-4" /> {t.save}
                  </button>
                </div>
              </Card>

              <Card title={t.nightJournal} icon={<Moon className="w-5 h-5" />} darkMode={darkMode}>
                <div className="space-y-4">
                  <p className="text-xs text-slate-400 italic">"What was the best part of your day?"</p>
                  <textarea 
                    value={journal.night}
                    onChange={(e) => setJournal({ ...journal, night: e.target.value })}
                    placeholder="Reflect on your achievements..."
                    className={`w-full h-40 p-4 ${darkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200'} rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm resize-none`}
                  />
                  <button 
                    onClick={() => handleSaveJournal('night')}
                    className="flex items-center gap-2 text-emerald-600 text-sm font-bold hover:underline"
                  >
                    <Save className="w-4 h-4" /> {t.save}
                  </button>
                </div>
              </Card>
            </div>
          </div>
        );
      case 'ai-coach':
        return (
          <div className="space-y-8">
            <Card title={t.aiCoachTitle} icon={<Sparkles className="w-5 h-5" />} darkMode={darkMode}>
              <div className="space-y-6">
                <div className={`p-6 ${darkMode ? 'bg-emerald-900/20 border-emerald-800' : 'bg-emerald-50 border-emerald-100'} rounded-2xl border`}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className={`text-lg font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-900'}`}>{t.coachAnalysis}</h4>
                    <button 
                      onClick={generateAIInsight}
                      disabled={isGenerating}
                      className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-bold rounded-xl hover:bg-emerald-700 disabled:opacity-50"
                    >
                      {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                      {t.generateInsights}
                    </button>
                  </div>
                  {aiInsight ? (
                    <div className={`prose prose-sm ${darkMode ? 'prose-invert' : ''} max-w-none`}>
                      <p className="whitespace-pre-wrap leading-relaxed">{aiInsight}</p>
                    </div>
                  ) : (
                    <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'} italic`}>
                      Click the button above to get personalized insights based on your trackers and goals.
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-4 ${darkMode ? 'bg-slate-800' : 'bg-slate-50'} rounded-xl`}>
                    <p className="text-xs font-bold text-slate-400 uppercase mb-2">Weekly Focus</p>
                    <p className={`text-sm ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>Consistency in hydration and early sleep.</p>
                  </div>
                  <div className={`p-4 ${darkMode ? 'bg-slate-800' : 'bg-slate-50'} rounded-xl`}>
                    <p className="text-xs font-bold text-slate-400 uppercase mb-2">Productivity Tip</p>
                    <p className={`text-sm ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>Batch your emails during the 11 AM snack break.</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        );
      case 'skill-roadmap':
        return (
          <div className="space-y-8">
            <Card title={t.skillRoadmapTitle} icon={<Award className="w-5 h-5" />} darkMode={darkMode}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {SKILL_ROADMAP.map((skill) => (
                  <div key={skill.id} className={`p-5 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'} rounded-2xl border shadow-sm`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 ${darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-600'} rounded-lg`}>
                          {skill.icon}
                        </div>
                        <h4 className={`font-bold ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>{skill.name}</h4>
                      </div>
                      <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${
                        skill.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 
                        skill.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {skill.status}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Progress</span>
                        <span className="font-bold text-emerald-500">{skill.progress}%</span>
                      </div>
                      <div className={`w-full ${darkMode ? 'bg-slate-900' : 'bg-slate-100'} h-1.5 rounded-full overflow-hidden`}>
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.progress}%` }}
                          className="h-full bg-emerald-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            <Card title={t.dailyTechSnippet} icon={<Monitor className="w-5 h-5" />} darkMode={darkMode}>
              <div className={`p-4 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'} rounded-xl border`}>
                <p className="text-xs font-bold text-emerald-500 uppercase mb-2">System Admin Tip</p>
                <code className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  $ find /var/log -type f -name "*.log" -mtime +7 -delete
                </code>
                <p className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-400'} mt-2 italic`}>
                  "Use this command to clean up log files older than 7 days to save disk space."
                </p>
              </div>
            </Card>
          </div>
        );
      case 'analytics':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card title={t.weightJourney} icon={<BarChart3 className="w-5 h-5" />} darkMode={darkMode}>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={fitnessLogs.slice().reverse()}>
                      <defs>
                        <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? '#334155' : '#e2e8f0'} />
                      <XAxis dataKey="date" hide />
                      <YAxis domain={['dataMin - 1', 'dataMax + 1']} hide />
                      <Tooltip 
                        contentStyle={{ backgroundColor: darkMode ? '#0f172a' : '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                        itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
                      />
                      <Area type="monotone" dataKey="weight" stroke="#10b981" fillOpacity={1} fill="url(#colorWeight)" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              <Card title={t.habitConsistency} icon={<CheckCircle2 className="w-5 h-5" />} darkMode={darkMode}>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={(Object.entries(habits) as [string, boolean[]][]).map(([name, data]) => ({ name, count: data.filter(Boolean).length }))}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? '#334155' : '#e2e8f0'} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: darkMode ? '#94a3b8' : '#64748b' }} />
                      <YAxis hide />
                      <Tooltip 
                        cursor={{ fill: 'transparent' }}
                        contentStyle={{ backgroundColor: darkMode ? '#0f172a' : '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                      />
                      <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                        {Object.entries(habits).map((_, index) => (
                          <Cell key={`cell-${index}`} fill={['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b'][index % 4]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
            <Card title="Yearly Heatmap" icon={<Calendar className="w-5 h-5" />} darkMode={darkMode}>
              <div className="flex flex-wrap gap-1">
                {new Array(365).fill(0).map((_, i) => {
                  const intensity = Math.random(); // Mock data for heatmap
                  return (
                    <div 
                      key={i} 
                      className={`w-3 h-3 rounded-sm ${
                        intensity > 0.8 ? 'bg-emerald-600' :
                        intensity > 0.5 ? 'bg-emerald-400' :
                        intensity > 0.2 ? 'bg-emerald-200' :
                        darkMode ? 'bg-slate-800' : 'bg-slate-100'
                      }`}
                      title={`Day ${i + 1}: ${Math.floor(intensity * 100)}% active`}
                    />
                  );
                })}
              </div>
              <div className="mt-4 flex items-center gap-2 text-[10px] text-slate-400">
                <span>Less</span>
                <div className="w-2 h-2 bg-slate-100 rounded-sm" />
                <div className="w-2 h-2 bg-emerald-200 rounded-sm" />
                <div className="w-2 h-2 bg-emerald-400 rounded-sm" />
                <div className="w-2 h-2 bg-emerald-600 rounded-sm" />
                <span>More</span>
              </div>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} font-sans transition-colors duration-300 overflow-hidden`}>
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 
        ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} 
        border-r p-6 flex flex-col gap-8 transition-transform duration-300 lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        no-print
      `}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h1 className={`font-bold ${darkMode ? 'text-white' : 'text-slate-900'} leading-tight`}>Life OS</h1>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Health & Productivity</p>
            </div>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? t.lightMode : t.darkMode}
              className={`flex-1 p-2 rounded-lg ${darkMode ? 'bg-slate-800 text-amber-400' : 'bg-slate-100 text-slate-600'} transition-colors flex items-center justify-center gap-2 text-xs font-bold`}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {darkMode ? 'Light' : 'Dark'}
            </button>
            <div className="relative flex-1">
              <select 
                value={lang}
                onChange={(e) => setLang(e.target.value as 'en' | 'hi')}
                className={`appearance-none w-full p-2 rounded-lg ${darkMode ? 'bg-slate-800 text-emerald-400 border-slate-700' : 'bg-slate-100 text-emerald-600 border-slate-200'} text-xs font-bold border outline-none cursor-pointer`}
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
              </select>
            </div>
          </div>
        </div>

        <nav className="flex flex-col gap-1 overflow-y-auto custom-scrollbar pr-2">
          <SidebarItem icon={<LayoutDashboard className="w-4 h-4" />} label={t.dashboard} active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} darkMode={darkMode} />
          <SidebarItem icon={<Clock className="w-4 h-4" />} label={t.routine} active={activeTab === 'routine'} onClick={() => setActiveTab('routine')} darkMode={darkMode} />
          <SidebarItem icon={<Dumbbell className="w-4 h-4" />} label={t.workout} active={activeTab === 'workout'} onClick={() => setActiveTab('workout')} darkMode={darkMode} />
          <SidebarItem icon={<Utensils className="w-4 h-4" />} label={t.diet} active={activeTab === 'diet'} onClick={() => setActiveTab('diet')} darkMode={darkMode} />
          <SidebarItem icon={<ChefHat className="w-4 h-4" />} label={t.recipes} active={activeTab === 'recipes'} onClick={() => setActiveTab('recipes')} darkMode={darkMode} />
          <SidebarItem icon={<Activity className="w-4 h-4" />} label={t.wellness} active={activeTab === 'wellness'} onClick={() => setActiveTab('wellness')} darkMode={darkMode} />
          <SidebarItem icon={<Timer className="w-4 h-4" />} label={t.focus} active={activeTab === 'focus'} onClick={() => setActiveTab('focus')} darkMode={darkMode} />
          <SidebarItem icon={<StickyNote className="w-4 h-4" />} label={t.notes} active={activeTab === 'notes'} onClick={() => setActiveTab('notes')} darkMode={darkMode} />
          <SidebarItem icon={<Wallet className="w-4 h-4" />} label={t.finance} active={activeTab === 'finance'} onClick={() => setActiveTab('finance')} darkMode={darkMode} />
          <SidebarItem icon={<Monitor className="w-4 h-4" />} label={t.itLifestyle} active={activeTab === 'it-lifestyle'} onClick={() => setActiveTab('it-lifestyle')} darkMode={darkMode} />
          <SidebarItem icon={<Target className="w-4 h-4" />} label={t.goalTracker} active={activeTab === 'trackers'} onClick={() => setActiveTab('trackers')} darkMode={darkMode} />
          <SidebarItem icon={<Brain className="w-4 h-4" />} label={t.aiCoach} active={activeTab === 'ai-coach'} onClick={() => setActiveTab('ai-coach')} darkMode={darkMode} />
          <SidebarItem icon={<LineChart className="w-4 h-4" />} label={t.analytics} active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} darkMode={darkMode} />
        </nav>

        {/* 20-20-20 Timer Widget */}
        <div className={`mt-auto p-4 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-emerald-50 border-emerald-100'} rounded-2xl border`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Timer className={`w-4 h-4 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
              <span className={`text-xs font-bold ${darkMode ? 'text-slate-300' : 'text-emerald-900'}`}>20-20-20 Rule</span>
            </div>
            <button 
              onClick={() => setTimerActive(!timerActive)}
              className={`p-1 rounded-md ${timerActive ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}
            >
              {timerActive ? <Zap className="w-3 h-3 fill-current" /> : <RefreshCw className="w-3 h-3" />}
            </button>
          </div>
          <p className={`text-2xl font-mono font-bold ${darkMode ? 'text-white' : 'text-emerald-900'}`}>{formatTime(timeLeft)}</p>
          <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">{timerType === 'work' ? t.focusing : t.eyeBreak}</p>
        </div>

        <div className={`p-4 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'} rounded-2xl border no-print`}>
          <button 
            onClick={handleExportPDF}
            className="w-full flex items-center justify-center gap-2 text-xs font-bold text-slate-500 hover:text-emerald-500 transition-colors"
          >
            <Download className="w-3 h-3" /> {t.exportPdf}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 lg:p-10 overflow-y-auto custom-scrollbar no-print">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-white border border-slate-200 shadow-sm"
            >
              <Zap className="w-6 h-6 text-emerald-600" />
            </button>
            <div>
              <h2 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'} capitalize`}>{t[activeTab as keyof typeof t] || activeTab.replace('-', ' ')}</h2>
              <p className="text-slate-50">{t.welcome}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className={`px-4 py-2 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} rounded-xl border shadow-sm flex items-center gap-2`}>
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>March 16, 2026</span>
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Hidden Print View */}
      <div className="hidden print-only p-10 space-y-20 bg-white text-black">
        <div className="text-center border-b-2 border-emerald-600 pb-10">
          <h1 className="text-4xl font-black text-emerald-900 mb-2">Life OS: Health & Productivity</h1>
          <p className="text-slate-500 uppercase tracking-widest font-bold">Comprehensive Life Report - March 2026</p>
        </div>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold border-l-4 border-emerald-600 pl-4">Daily Routine</h2>
          <div className="grid grid-cols-2 gap-4">
            {DAILY_ROUTINE.map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-xs font-mono text-slate-400 w-16">{item.time}</span>
                <span className="text-sm font-medium text-slate-800">{item.activity}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold border-l-4 border-emerald-600 pl-4">Workout Plan</h2>
          <div className="grid grid-cols-1 gap-6">
            {WORKOUT_PLAN.map((day, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <h4 className="font-bold text-emerald-900 mb-2">{day.day} - {day.focus}</h4>
                <ul className="grid grid-cols-2 gap-2">
                  {day.exercises.map((ex, j) => (
                    <li key={j} className="text-sm text-slate-600 flex items-center gap-2">
                      <div className="w-1 h-1 bg-emerald-500 rounded-full" /> {ex}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold border-l-4 border-emerald-600 pl-4">Weekly Meal Plan</h2>
          <table className="w-full border-collapse border border-slate-200">
            <thead>
              <tr className="bg-slate-50">
                <th className="border border-slate-200 p-2 text-left text-xs uppercase">Day</th>
                <th className="border border-slate-200 p-2 text-left text-xs uppercase">Breakfast</th>
                <th className="border border-slate-200 p-2 text-left text-xs uppercase">Lunch</th>
                <th className="border border-slate-200 p-2 text-left text-xs uppercase">Dinner</th>
              </tr>
            </thead>
            <tbody>
              {mealPlan.map((day, i) => (
                <tr key={i}>
                  <td className="border border-slate-200 p-2 text-sm font-bold">{day.day}</td>
                  <td className="border border-slate-200 p-2 text-sm">{day.breakfast}</td>
                  <td className="border border-slate-200 p-2 text-sm">{day.lunch}</td>
                  <td className="border border-slate-200 p-2 text-sm">{day.dinner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold border-l-4 border-emerald-600 pl-4">Monthly Goals</h2>
          <div className="space-y-4">
            {goals.map((goal) => (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-bold">{goal.title} ({goal.category})</span>
                  <span className="text-sm font-bold">{goal.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: `${goal.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold border-l-4 border-emerald-600 pl-4">Fitness Logs</h2>
          <div className="space-y-4">
            {fitnessLogs.map((log, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex justify-between">
                <div>
                  <p className="text-xs text-slate-400 font-mono">{log.date}</p>
                  <p className="text-sm font-bold text-slate-800">{log.workout}</p>
                  <p className="text-xs text-slate-500 italic">"{log.notes}"</p>
                </div>
                <p className="text-sm font-bold text-blue-600">{log.weight} kg</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold border-l-4 border-emerald-600 pl-4">Journal Reflections</h2>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <h3 className="font-bold text-emerald-900">Morning Journal</h3>
              <p className="text-sm text-slate-600 whitespace-pre-wrap">{journal.morning || 'No entry for today.'}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-emerald-900">Night Journal</h3>
              <p className="text-sm text-slate-600 whitespace-pre-wrap">{journal.night || 'No entry for today.'}</p>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${darkMode ? '#334155' : '#e2e8f0'};
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${darkMode ? '#475569' : '#cbd5e1'};
        }

        @media print {
          .no-print {
            display: none !important;
          }
          .print-only {
            display: block !important;
          }
          aside {
            display: none !important;
          }
          main {
            display: none !important;
          }
          .grid {
            display: grid !important;
          }
          .card, div[class*="rounded-2xl"] {
            break-inside: avoid;
            margin-bottom: 2rem !important;
            border: 1px solid #e2e8f0 !important;
            box-shadow: none !important;
          }
          body {
            background: white !important;
            color: black !important;
          }
          header {
            display: none !important;
          }
          canvas {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
