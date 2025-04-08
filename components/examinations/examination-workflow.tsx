"use client"

import { CheckCircle, Circle, Clock } from "lucide-react"

interface ExaminationWorkflowProps {
  exam: {
    preTestingStatus: string
    examStatus: string
    prescriptionStatus: string
  }
}

export function ExaminationWorkflow({ exam }: ExaminationWorkflowProps) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex flex-col items-center">
        {exam.preTestingStatus === "Completed" ? (
          <CheckCircle className="h-5 w-5 text-green-500" />
        ) : exam.preTestingStatus === "In Progress" ? (
          <Clock className="h-5 w-5 text-blue-500" />
        ) : (
          <Circle className="h-5 w-5 text-gray-300" />
        )}
        <span className="text-xs">Pre-Test</span>
      </div>
      <div className="h-[2px] w-3 bg-gray-200" />
      <div className="flex flex-col items-center">
        {exam.examStatus === "Completed" ? (
          <CheckCircle className="h-5 w-5 text-green-500" />
        ) : exam.examStatus === "In Progress" ? (
          <Clock className="h-5 w-5 text-blue-500" />
        ) : (
          <Circle className="h-5 w-5 text-gray-300" />
        )}
        <span className="text-xs">Exam</span>
      </div>
      <div className="h-[2px] w-3 bg-gray-200" />
      <div className="flex flex-col items-center">
        {exam.prescriptionStatus === "Issued" ? (
          <CheckCircle className="h-5 w-5 text-green-500" />
        ) : exam.prescriptionStatus === "In Progress" ? (
          <Clock className="h-5 w-5 text-blue-500" />
        ) : (
          <Circle className="h-5 w-5 text-gray-300" />
        )}
        <span className="text-xs">Rx</span>
      </div>
    </div>
  )
}

