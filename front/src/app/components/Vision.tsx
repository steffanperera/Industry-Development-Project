import { ImageWithFallback } from './figma/ImageWithFallback';
import { Heart} from 'lucide-react';


const goals = [
  "Help hidden carers recognise and understand their caregiving skills",
  "Provide a simple self-assessment platform for caregivers",
  "Match caregiving abilities with recognised professional skill categories",
  "Support career growth and future employment opportunities",
  "Generate digital certificates based on completed assessments"
];

const purposes = [
  "Digitally recognise informal caregiving experience",
  "Support carers with professional development pathways",
  "Provide accessible online self-assessment tools",
  "Improve awareness of caregiver wellbeing and support needs"
];

export function Vision() {
  return (
    <section className="py-20 bg-[#dcfce7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        

        <div className="grid md:grid-cols-1 gap-8 text-center">
            <div className="bg-gray-50 p-8 rounded-xl relative">
              <div className=" items-center gap-4 ">
               <div className="text-center mb-16">
        <h3 className="text-3xl md:text-4xl mb-4 text-gray-900">
            "Our Vision of CARE-ABLE"
          </h3>
          </div>
                <div>
                  <div className="text-lg text-center text-gray-900">
                    <p>A platform enabling formal recognition of hidden carers’ informal caregiving capabilities.</p></div>
                </div>
              </div>
            </div>

            
        </div>

         <div className="grid md:grid-cols-2 gap-8 mt-10">
            <div  className="bg-gray-50 p-8 rounded-xl relative">
              <p className="text-lg text-gray-700 mb-6 italic">Our Goals & Objectives</p>
              <div className="flex items-center gap-4">
                
                <div>
                  <ul style={{ listStyleType: 'none', paddingLeft: 0 }} >
                  {goals.map((goal, index) => (
                  <li key={index}>💚 {goal}</li>
                  ))}
                  </ul>
                </div>
              </div>
            </div>

            <div  className="bg-gray-50 p-8 rounded-xl relative">
              <p className="text-lg text-gray-700 mb-6 italic">Our Goals & Objectives</p>
              <div className="flex items-center gap-4">
                
                <div>
                  <ul style={{ listStyleType: 'none', paddingLeft: 0 }} >
                  {purposes.map((goal, index) => (
                  <li key={index}>💚 {goal}</li>
                  ))}
                  </ul>
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}