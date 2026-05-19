export type StepDataType = {
    stepNumber: number;
    title: string;
    description: string;
    iconSrc: string;
};

export interface StepCardProps {
    stepNumber: number;
    iconSrc: string;
    title: string;
    description: string;
}

export type BenefitSectionType = {
    tag: string;
    tagImg: string;
    title: string;
    description: string;
    img: string;
    bgColor: string;
    isWide: boolean;
    reverse?: boolean;
}


