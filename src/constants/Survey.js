import Image1 from '../assets/images/01.jpg'
import Image2 from '../assets/images/02.jpg'
import Image3 from '../assets/images/03.jpg'
import Image4 from '../assets/images/04.jpg'
import Image5 from '../assets/images/05.jpg'
import Image6 from '../assets/images/06.jpg'

export const Survey = [
    {
        id: 1,
        type: 0,
        question:
            'Have you ever used an online styling or personal shopping service like Stitch Fix or Trunk Club?',
        answers: [
            {
                id: 1,
                answer: "Yes"
            },
            {
                id: 2,
                answer: "No",
            }
        ],
    },
    {
        id: 2,
        type: 1,
        question: 'Which online styling service have you used?',
        answers: [
            {
                id: 1,
                answer: 'Stitch Fix'
            },
            {
                id: 2,
                answer: 'Trunk Club'
            },
            {
                id: 3,
                answer: 'Amazon Wardrobe'
            },
            {
                id: 4,
                answer: 'Dia & Co'
            }
        ]
    },
    {
        id: 3,
        type: 1,
        question: 'How would you rate your experience with this service(s)?',
        answers: [
            {
                id: 1,
                answer: '1',
            },
            {
                id: 2,
                answer: '2',
            },
            {
                id: 3,
                answer: '3',
            },
            {
                id: 4,
                answer: '4',
            },
            {
                id: 5,
                answer: '5',
            }
        ]
    },
    {
        id: 4,
        question:
            'Why do you prefer shopping online? Check all that apply.',
        answers: [
            {
                id: 1,
                answer: 'I can see more items at once online',
            },
            {
                id: 2,
                answer: 'I can shop outside of normal store hours'
            },
            {
                id: 3,
                answer: 'I prefer helping myself as opposed to having the help of a store associate'
            },
            {
                id: 4,
                answer: "I might enjoy looking great but I don't enjoy the act of shopping"
            },
            {
                id: 5,
                answer: "I can get better deals online"
            },
            {
                id: 6,
                answer: "I don't want to interact with people or deal with other shoppers"
            },
            {
                id: 7,
                answer: "I don't mind the risk of returns"
            },
            {
                id: 8,
                answer: "There are no lines to wait in"
            },
            {
                id: 9,
                answer: "I can search for what I want easily (i.e. &quot;black dress&quot;)"
            },
            {
                id: 10,
                answer: "I usually already know what I want when shopping online"
            }
        ],
        multiselect: true,
    },
    // {
    //     id: 3,
    //     question:
    //         'Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.',
    //     options: [
    //         {
    //             id: 1,
    //             image: Image1
    //         },
    //         {
    //             id: 2,
    //             image: Image2,
    //         },
    //         {
    //             id: 3,
    //             image: Image3,
    //         },
    //         {
    //             id: 4,
    //             image: Image4
    //         }
    //     ],
    // },
    // {
    //     id: 4,
    //     question:
    //         'Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.',
    //     options: [
    //         {
    //             id: 1,
    //             image: Image1
    //         },
    //         {
    //             id: 2,
    //             image: Image2,
    //         },
    //         {
    //             id: 3,
    //             image: Image3,
    //         },
    //         {
    //             id: 4,
    //             image: Image4
    //         }
    //     ],
    // },
    // {
    //     id: 5,
    //     question:
    //         'Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.',
    //     options: [
    //         {
    //             id: 1,
    //             image: Image1
    //         },
    //         {
    //             id: 2,
    //             image: Image2,
    //         },
    //         {
    //             id: 3,
    //             image: Image3,
    //         },
    //         {
    //             id: 4,
    //             image: Image4
    //         }
    //     ],
    // }
];