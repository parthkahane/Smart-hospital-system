// This file can be used to populate the Disease collection with sample data
// Run this once to initialize the disease database for AI diagnosis suggestions

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Disease = require('./models/Disease');

const sampleDiseases = [
    {
        name: 'Common Cold',
        symptoms: ['runny nose', 'sore throat', 'cough', 'sneezing', 'mild fever', 'fatigue'],
        description: 'Viral infection causing respiratory symptoms. Usually self-limiting.',
        severity: 'mild',
        treatment: 'Rest, fluids, saline drops, over-the-counter pain relievers'
    },
    {
        name: 'Influenza (Flu)',
        symptoms: ['fever', 'cough', 'headache', 'muscle pain', 'fatigue', 'sore throat', 'chills'],
        description: 'Contagious respiratory illness caused by influenza virus.',
        severity: 'moderate',
        treatment: 'Antivirals (if caught early), rest, hydration, fever management'
    },
    {
        name: 'COVID-19',
        symptoms: ['fever', 'cough', 'fatigue', 'loss of taste', 'loss of smell', 'shortness of breath', 'sore throat'],
        description: 'Respiratory illness caused by coronavirus (SARS-CoV-2).',
        severity: 'moderate',
        treatment: 'Supportive care, isolation, consultation with healthcare provider'
    },
    {
        name: 'Migraine',
        symptoms: ['severe headache', 'nausea', 'light sensitivity', 'visual disturbances', 'dizziness'],
        description: 'Neurological condition causing intense throbbing pain, usually on one side of head.',
        severity: 'moderate',
        treatment: 'Rest in dark room, medication (triptans), avoiding triggers'
    },
    {
        name: 'Bronchitis',
        symptoms: ['cough', 'phlegm', 'chest discomfort', 'shortness of breath', 'low fever', 'fatigue'],
        description: 'Inflammation of bronchial tubes in lungs. Can be viral or bacterial.',
        severity: 'moderate',
        treatment: 'Cough suppressants, expectorants, inhalers, rest'
    },
    {
        name: 'Pneumonia',
        symptoms: ['cough', 'fever', 'shortness of breath', 'chest pain', 'fatigue', 'phlegm'],
        description: 'Infection causing inflammation in air sacs of lungs. Can be bacterial, viral, or fungal.',
        severity: 'severe',
        treatment: 'Antibiotics (if bacterial), oxygen therapy, hospitalization if severe'
    },
    {
        name: 'Asthma',
        symptoms: ['wheezing', 'shortness of breath', 'chest tightness', 'cough', 'difficulty breathing'],
        description: 'Chronic inflammatory disorder of airway causing breathing difficulties.',
        severity: 'moderate',
        treatment: 'Inhalers, bronchodilators, corticosteroids, avoiding triggers'
    },
    {
        name: 'Allergies',
        symptoms: ['sneezing', 'itchy eyes', 'runny nose', 'itchy throat', 'nasal congestion', 'skin rash'],
        description: 'Immune system overreaction to harmless substance.',
        severity: 'mild',
        treatment: 'Antihistamines, decongestants, nasal sprays, avoiding allergens'
    },
    {
        name: 'Gastroenteritis',
        symptoms: ['diarrhea', 'nausea', 'vomiting', 'stomach cramps', 'fever', 'loss of appetite'],
        description: 'Inflammation of stomach and intestines, commonly called stomach flu.',
        severity: 'moderate',
        treatment: 'Hydration, electrolytes, light diet, anti-nausea medication'
    },
    {
        name: 'Tuberculosis',
        symptoms: ['persistent cough', 'cough with blood', 'chest pain', 'fever', 'night sweats', 'weight loss'],
        description: 'Serious infectious disease affecting lungs, caused by Mycobacterium tuberculosis.',
        severity: 'severe',
        treatment: 'Multi-drug antibiotic therapy for 6+ months, isolation'
    },
    {
        name: 'Diabetes',
        symptoms: ['increased thirst', 'frequent urination', 'fatigue', 'blurred vision', 'weight loss', 'slow healing'],
        description: 'Chronic condition affecting blood sugar regulation.',
        severity: 'severe',
        treatment: 'Insulin/oral medication, diet control, exercise, blood sugar monitoring'
    },
    {
        name: 'Hypertension',
        symptoms: ['headache', 'dizziness', 'chest pain', 'shortness of breath', 'nosebleeds'],
        description: 'Elevated blood pressure that can damage heart and blood vessels.',
        severity: 'moderate',
        treatment: 'Medication (ACE inhibitors, beta-blockers), diet, exercise'
    },
    {
        name: 'Urinary Tract Infection',
        symptoms: ['burning urination', 'frequent urination', 'urine cloudy', 'lower abdomen pain', 'fever'],
        description: 'Bacterial infection in urinary system.',
        severity: 'mild',
        treatment: 'Antibiotics, hydration, pain management'
    },
    {
        name: 'Chicken Pox',
        symptoms: ['fever', 'rash', 'blisters', 'itching', 'fatigue', 'body aches'],
        description: 'Contagious viral infection causing characteristic fluid-filled blisters.',
        severity: 'mild',
        treatment: 'Calamine lotion, antihistamines, antiviral medication (acyclovir)'
    },
    {
        name: 'Hepatitis',
        symptoms: ['jaundice', 'fatigue', 'abdominal pain', 'nausea', 'dark urine', 'pale stool'],
        description: 'Inflammation of liver, can be caused by viruses (A, B, C).',
        severity: 'severe',
        treatment: 'Supportive care, rest, hydration, antiviral medication (for hepatitis B/C)'
    }
];

async function populateDiseases() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected');

        // Check if diseases already exist
        const existingCount = await Disease.countDocuments();
        if (existingCount > 0) {
            console.log(`Database already contains ${existingCount} diseases. Skipping population.`);
            console.log('To re-populate, delete existing documents first.');
        } else {
            // Insert sample diseases
            await Disease.insertMany(sampleDiseases);
            console.log(`Successfully inserted ${sampleDiseases.length} diseases into database`);
        }

        mongoose.connection.close();
    } catch (error) {
        console.error('Error populating diseases:', error.message);
        mongoose.connection.close();
    }
}

// Run population if executed directly
if (require.main === module) {
    populateDiseases();
}

module.exports = populateDiseases;
