const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '../data/student_benefits.json');
const outputPath = path.join(__dirname, '../data/student-benefits-2026.ts');

const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

console.log('Total JSON items:', jsonData.length);

const cleanedData = jsonData.filter(item => {
    // Filter out items that look broken
    return item.title && item.offerSummary && item.url;
}).map(item => ({
    title: item.title,
    company: item.company,
    category: item.category || 'Miscellaneous',
    appCategory: item.appCategory,
    offerSummary: item.offerSummary,
    benefitType: item.benefitType,
    value: item.value || 'N/A',
    eligibility: item.eligibility || 'Students',
    region: item.region || 'Global',
    verification: item.verification || 'N/A',
    url: item.url
}));

const content = `import { StudentBenefit } from './student-benefits';

export interface StudentBenefit {
    title: string;
    company: string;
    category: string;
    appCategory: 'Free Access' | 'Credits & Savings' | 'Funding & Opportunities';
    offerSummary: string;
    benefitType: string;
    value: string;
    eligibility: string;
    region: string;
    verification: string;
    url: string;
}

export const studentBenefits2026: StudentBenefit[] = ${JSON.stringify(cleanedData, null, 2)};
`;

fs.writeFileSync(outputPath, content);
console.log(`Generated ${cleanedData.length} benefits in ${outputPath}`);
