"use client";
import { NasabahMarketing } from "@/types";
import { Row } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { Eye } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { PredictionData } from "@/lib/types";

interface DataTableRowActionsDetailProps {
  row: Row<PredictionData>;
}

const personalInfoFields = [
  { key: "marital", label: "Marital Status" },
  { key: "education", label: "Education" },
];

const loanFields = [
  { key: "default", label: "Credit Default" },
  { key: "housing", label: "Housing Loan" },
  { key: "loan", label: "Personal Loan" },
];

const contactFields = [
  { key: "contact", label: "Contact Type" },
  { key: "month", label: "Last Contact Month" },
  { key: "dayOfWeek", label: "Last Contact Day" },
  { key: "duration", label: "Contact Duration" },
  { key: "campaign", label: "Campaign Contacts" },
  { key: "pdays", label: "Days Since Contact" },
  { key: "previous", label: "Previous Contacts" },
  { key: "poutcome", label: "Previous Campaign Result" },
];

const economicFields = [
  { key: "empVarRate", label: "Employment Variation Rate" },
  { key: "consPriceIdx", label: "Consumer Price Index" },
  { key: "consConfIdx", label: "Consumer Confidence Index" },
  { key: "euribor3m", label: "Euribor 3m Rate" },
  { key: "nrEmployed", label: "Number of Employees" },
];

export function DataTableRowActionsDetail({
  row,
}: DataTableRowActionsDetailProps) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const nasabah = row.original;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderValue = (key: string, value: any) => {
    switch (key) {
      case "duration": {
        const seconds = value as number;
        const minutes = Math.floor(seconds / 60);
        return `${minutes}m ${seconds % 60}s`;
      }
      case "pdays":
        return value === -1 || value === 999
          ? "Never contacted"
          : `${value} days`;
      case "default":
      case "housing":
      case "loan":
        return value ? "Yes" : "No";
      default:
        return String(value);
    }
  };

  const isBadgeField = [
    "marital",
    "education",
    "default",
    "housing",
    "loan",
    "contact",
    "month",
    "dayOfWeek",
    "poutcome",
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderField = (key: string, value: any) => {
    const displayValue = renderValue(key, value);
    if (isBadgeField.includes(key)) {
      return <Badge>{displayValue}</Badge>;
    }
    return <p className="text-sm">{displayValue}</p>;
  };

  return (
    <>
      <Button size="sm" onClick={() => setSheetOpen(true)} className="gap-2">
        <Eye className="w-4 h-4" />
        Detail
      </Button>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-full ] max-h-screen overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Customer Data Details</SheetTitle>
          </SheetHeader>

          <Tabs defaultValue="personal" className="w-full mt-6 px-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="loan">Loan</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="economic">Economic</TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
            <TabsContent value="personal" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">ID</p>
                  <p className="text-xs font-semibold break-all">
                    {nasabah.id}
                  </p>
                </div>
              
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Age</p>
                  <p className="text-sm font-semibold">{nasabah.age} years</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Job</p>
                  <Badge>{nasabah.job}</Badge>
                </div>
              </div>

              <div className="space-y-3">
                {personalInfoFields.map((field) => {
                  const value = nasabah[field.key as keyof PredictionData ];
                  return (
                    <div key={field.key}>
                      <p className="text-sm font-medium text-gray-600">
                        {field.label}
                      </p>
                      {renderField(field.key, value)}
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            {/* Loan Information Tab */}
            <TabsContent value="loan" className="space-y-4 mt-4">
              {loanFields.map((field) => {
                const value = nasabah[field.key as keyof PredictionData];
                return (
                  <div key={field.key}>
                    <p className="text-sm font-medium text-gray-600">
                      {field.label}
                    </p>
                    {renderField(field.key, value)}
                  </div>
                );
              })}
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm font-medium text-gray-600">
                  Subscription Probability
                </p>
                <Badge
                 
                >

                </Badge>
              </div>
            </TabsContent>

            {/* Contact Information Tab */}
            <TabsContent value="contact" className="space-y-4 mt-4">
              {contactFields.map((field) => {
                const value = nasabah[field.key as keyof PredictionData];
                return (
                  <div key={field.key}>
                    <p className="text-sm font-medium text-gray-600">
                      {field.label}
                    </p>
                    {renderField(field.key, value)}
                  </div>
                );
              })}
            </TabsContent>

            {/* Economic Indicators Tab */}
            <TabsContent value="economic" className="space-y-4 mt-4">
              {economicFields.map((field) => {
                const value = nasabah[field.key as keyof PredictionData];
                return (
                  <div key={field.key}>
                    <p className="text-sm font-medium text-gray-600">
                      {field.label}
                    </p>
                    <p className="text-sm">
                      {typeof value === "number" ? value.toFixed(2) : value}
                    </p>
                  </div>
                );
              })}
            </TabsContent>
          </Tabs>

          <div className="mt-6 pt-4 border-t space-y-2 text-xs text-gray-500 px-4">
            <div className="flex justify-between">
              <span>Created:</span>
              <span>
                {row.getValue("created_at")
                  ? new Date(
                      row.getValue("created_at") as string | number
                    ).toLocaleString()
                  : "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Updated:</span>
              <span>
                {row.getValue("updated_at")
                  ? new Date(
                      row.getValue("updated_at") as string | number
                    ).toLocaleString()
                  : "N/A"}
              </span>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}