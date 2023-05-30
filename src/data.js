import universities from './universities.json';
import polytechnics from './polytechnics.json';
import colleges from './colleges.json'
import states from './states.json'


const salaryRange = (min, max, interval) => {
    let arr = [];
    for(let i = min; i < max; i+=interval){
        let txt = `${i},000 - ${i+interval},000`;
        let maxText = `${i+interval},000 and above`;
        arr.push(txt)
        if((i+interval) >= max){
            arr.push(maxText)
        } 
        
    }
    return arr;
}

let profileData = ([
    {
        title: 'About You',
        type: 'text',
        value: ''
    },
    {
        title: 'Title',
        type: 'select',
        value: '',
        options: ['Mr', 'Mrs', 'Ms', 'Dr', 'Prof', 'Chief']
    },
    {
        title: 'First Name',
        type: 'text',
        value: ''
    },
    {
        title: 'Middle Name',
        type: 'text',
        value: ''
    },
    {
        title: 'Last Name',
        type: 'text',
        value: ''
    },
    {
        title: 'Gender',
        type: 'select',
        value: '',
        options: ['Male', 'Female']
    },
    {
        title: 'Date Of Birth',
        type: 'date',
        value: ''
    },
    {
        title: 'NIN',
        type: 'text',
        value: ''
    },
    {
        title: 'Religion',
        type: 'select',
        value: '',
        options: ['Christianity', 'Islam', 'Others']
    },
    {
        title: 'Nationality',
        type: 'text',
        value: ''
    },
    {
        title: 'State Of Origin',
        type: 'select',
        value: '',
        options: states.map(state => state.state)
    },
    {
        title: 'Local Government Area',
        type: 'text',
        value: '',
       
    },
    {
        title: 'Marital Status',
        type: 'select',
        value: 'Married',
        options: ['Married', 'Single', 'Divorced', 'Widow/Widower']
    },
    {
        title: 'Date Of Marriage',
        type: 'date',
        value: '',
        requiredTitle: 'Marital Status',
        requiredValue: 'Married'
    },
    {
        title: 'Date Of Divorce',
        type: 'date',
        value: '',
        requiredTitle: 'Marital Status',
        requiredValue: 'Divorced'
    },
    {
        title: 'Date Of Widow/Widower',
        type: 'date',
        value: '',
        requiredTitle: 'Marital Status',
        requiredValue: 'Widow/Widower'
    },
    {
        title: 'Number of Children',
        type: 'number',
        value: ''
    },
    {
        title: 'Number of Dependents',
        type: 'number',
        value: ''
    },
    {
        title: 'Physical Address',
        type: 'text',
        value: ''
    },
    {
        title: 'Office Address',
        type: 'text',
        value: ''
    },
    {
        title: 'Do You Have Any Disability?',
        type: 'select',
        value: '',
        options: ['Yes', 'No']
    },
    {
        title: 'If Yes Specify',
        type: 'text',
        value: '',
        requiredTitle: 'Do You Have Any Disability?',
        requiredValue: 'Yes'
    },
    {
        title: 'When Did it Occur?',
        type: 'select',
        value: '',
        options: ['Before Graduation', 'After Graduation'],
        requiredTitle: 'Do You Have Any Disability?',
        requiredValue: 'Yes'
    },
    {
        title: 'Contact [Mobile Phone Number]',
        type: 'number',
        value: ''
    },
    {
        title: 'Institution Attended',
        type: 'select',
        value: '',
        options: ['University', 'Polytechnic', 'College Of Education']
    },
    {
        title: 'University Attended',
        type: 'select',
        value: '',
        options: universities.map(item => item.name),
        requiredTitle: 'Institution Attended',
        requiredValue: 'University'
    },
    {
        title: 'Polytechnic Attended',
        type: 'select',
        value: '',
        options: polytechnics.map(item => item),
        requiredTitle: 'Institution Attended',
        requiredValue: 'Polytechnic'
    },
    {
        title: 'College Attended',
        type: 'select',
        value: '',
        options: colleges.map(item => item.name),
        requiredTitle: 'Institution Attended',
        requiredValue: 'College Of Education'
    },
    {
        title: 'Year Of Entry',
        type: 'text',
        value: ''
    },
    {
        title: 'Entry Mode',
        type: 'select',
        value: '',
        options: ['Sandwich', 'Part Time', 'Full Time']
    },
    {
        title: 'Matriculation Number',
        type: 'text',
        value: ''
    },
    {
        title: 'Faculty / School',
        type: 'text',
        value: ''
    },
    {
        title: 'Department',
        type: 'text',
        value: ''
    },
    {
        title: 'Course of Study',
        type: 'text',
        value: ''
    },
    {
        title: 'Year Of Graduation',
        type: 'text',
        value: ''
    },
    {
        title: 'Cumulative Grade Point Average (CGPA)',
        type: 'number',
        value: ''
    },
    {
        title: 'Awards',
        type: 'text',
        value: ''
    },
    {
        title: 'Facebook',
        type: 'text',
        value: ''
    },
    {
        title: 'Twitter',
        type: 'text',
        value: ''
    },
    {
        title: 'Instagram',
        type: 'text',
        value: ''
    },
    {
        title: 'Linkedin',
        type: 'text',
        value: ''
    },
    {
        title: 'Research Gate',
        type: 'text',
        value: ''
    },
    {
        title: 'Whatsapp',
        type: 'text',
        value: ''
    },
    
    
    
    
]);

let qualificationData = ([
    {
        title: 'Special Skill Acquired Before Graduation',
        type: 'text',
        value: '',
    },
    {
        title: 'Enter Skill Level',
        type: 'select',
        value: '',
        options: ['NSQ LEVEL 0', 'NSQ LEVEL 1', 'NSQ LEVEL 2', 'NSQ LEVEL 3', 'NSQ LEVEL 4', 'NSQ LEVEL 5', 'NSQ LEVEL 6', 'NSQ LEVEL 7', 'NSQ LEVEL 8']
    },
    {
        title: 'Special Skill Acquired After Graduation',
        type: 'text',
        value: '',
    },
    {
        title: 'Enter Skill Level',
        type: 'select',
        value: '',
        options: ['NSQ LEVEL 0', 'NSQ LEVEL 1', 'NSQ LEVEL 2', 'NSQ LEVEL 3', 'NSQ LEVEL 4', 'NSQ LEVEL 5', 'NSQ LEVEL 6', 'NSQ LEVEL 7', 'NSQ LEVEL 8']
    },
]);

let employmentData = ([
    {
        title: 'Are You Employed',
        type: 'select',
        value: '',
        options: ['Yes', 'No']
    },
    {
        title: 'Type Of Employment',
        type: 'select',
        value: '',
        options: ['Public', 'Private', 'NGO', 'Self Employed'],
        
    },
    {
        title: 'Name of Organisation',
        type: 'text',
        value: ''
    },
    {
        title: 'Position',
        type: 'text',
        value: ''
    },
    {
        title: 'Job Title',
        type: 'text',
        value: ''
    },
    {
        title: 'Job Description',
        type: 'text',
        value: ''
    },
    
    {
        title: 'Date Of Employment',
        type: 'date',
        value: ''
    },
    
    {
        title: 'Grade Level / Scale',
        type: 'number',
        value: ''
    },
    {
        title: 'Number Of Staff',
        type: 'number',
        value: '',
        requiredTitle: 'Type Of Employment',
        requiredValue: 'Self Employed'
    },
    {
        title: 'State Individual Staff Role',
        type: 'text',
        value: '',
        requiredTitle: 'Type Of Employment',
        requiredValue: 'Self Employed'
    },
    {
        title: 'Basic Salary',
        type: 'select',
        value: '',
        options: salaryRange(1, 400, 19)
    },
    {
        title: 'Monthly Salary',
        type: 'select',
        value: '',
        options: salaryRange(1, 500, 19)
    },
    {
        title: 'Annual Salary',
        type: 'select',
        value: '',
        options: ['Below 100,000', '101,000 - 500,000', '501,000 - 1,000,000', '1,000,000 - 5,000,000', '5,000,000 - 10,000,000', '10,000,000 - 15,000,000', '15,000,000 and above']
    },
    
    
]);

let otherQualificationData = ([
    [
        {
            title: 'Institution Attended',
            type: 'select',
            value: '',
            options: ['University', 'Polytechnic', 'College Of Education']
        },
        {
            title: 'University Attended',
            type: 'select',
            value: '',
            options: universities.map(item => item.name),
            requiredTitle: 'Institution Attended',
            requiredValue: 'University'
        },
        {
            title: 'Polytechnic Attended',
            type: 'select',
            value: '',
            options: polytechnics.map(item => item),
            requiredTitle: 'Institution Attended',
            requiredValue: 'Polytechnic'
        },
        {
            title: 'College Attended',
            type: 'select',
            value: '',
            options: colleges.map(item => item.name),
            requiredTitle: 'Institution Attended',
            requiredValue: 'College Of Education'
        },
        {
            title: 'Year Of Entry',
            type: 'text',
            value: ''
        },
        {
            title: 'Entry Mode',
            type: 'select',
            value: '',
            options: ['Sandwich', 'Part Time', 'Full Time']
        },
        {
            title: 'Matriculation Number',
            type: 'text',
            value: ''
        },
        {
            title: 'Faculty / School',
            type: 'text',
            value: ''
        },
        {
            title: 'Department',
            type: 'text',
            value: ''
        },
        {
            title: 'Course of Study',
            type: 'text',
            value: ''
        },
        {
            title: 'Year Of Graduation',
            type: 'text',
            value: ''
        },
        {
            title: 'Cumulative Grade Point Average (CGPA)',
            type: 'number',
            value: ''
        },
        {
            title: 'Awards',
            type: 'text',
            value: ''
        },
    ],
])

export {profileData, qualificationData, employmentData, otherQualificationData}