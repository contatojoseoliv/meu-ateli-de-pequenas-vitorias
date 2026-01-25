 import { Check } from "lucide-react";
 import { Button as ShadcnButton } from "@/components/ui/button";
 import { Separator } from "@/components/ui/separator";
 
 interface Pricing6Props {
   heading: string;
   description?: string;
   price?: string | number;
   priceSuffix?: string;
   features?: string[][];
   buttonText?: string;
 }
 
 const defaultFeatures = [
   ["Unlimited", "Integrations", "24/7 support"],
   ["Live collaborations", "Unlimited storage", "30-day money back"],
   ["Unlimited members", "Customization", "Unlimited users"],
 ];
 
 export const Pricing6 = ({
   heading = "Pricing",
   description = "Simple pricing with a free 7 day trial.",
   price = 29,
   priceSuffix = "/mo",
   features = defaultFeatures,
   buttonText = "Start free trial",
 }: Pricing6Props) => {
   return (
     <div className="w-full py-20 lg:py-40">
       <div className="container mx-auto">
         <div className="flex flex-col gap-10">
           <div className="flex flex-col items-start gap-4">
             <div>
               <h1 className="font-serif text-3xl md:text-5xl max-w-xl tracking-tighter text-left font-regular text-grafite-suave">
                 {heading}
               </h1>
             </div>
             <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground text-left">
               {description}
             </p>
             <div className="flex flex-col text-left gap-8 w-full">
               <div className="flex flex-col gap-6">
                 {features.map((featureGroup, idx) => (
                   <div key={idx} className="flex flex-col gap-2">
                     <div>
                       {featureGroup.map((feature, i) => (
                         <div key={i} className="flex flex-row gap-4 items-start">
                           <Check className="w-4 h-4 mt-2 text-verde-eucalipto flex-shrink-0" />
                           <div className="flex flex-col">
                             <p className="text-grafite-suave">{feature}</p>
                           </div>
                         </div>
                       ))}
                     </div>
                     {idx < features.length - 1 && <Separator />}
                   </div>
                 ))}
               </div>
               <div className="flex flex-col gap-4 items-start">
                 <div className="inline-flex items-baseline gap-2">
                   <p className="font-serif text-5xl md:text-6xl tracking-tighter text-ocre-dourado font-bold">
                     {price}
                   </p>
                   <p className="text-verde-eucalipto font-semibold tracking-tight">
                     {priceSuffix}
                   </p>
                 </div>
                 <ShadcnButton className="gap-4 w-full bg-gradient-to-br from-ocre-dourado to-rosa-argila text-white hover:opacity-90">
                   {buttonText}
                 </ShadcnButton>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   );
 };