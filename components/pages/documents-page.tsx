"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/status-badge"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { documents } from "@/data/mock-data"
import {
  Upload,
  FileText,
  Eye,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface DocumentsPageProps {
  onNavigate: (page: string) => void
}

export function DocumentsPage({ onNavigate: _onNavigate }: DocumentsPageProps) {
  const [dragActive, setDragActive] = useState(false)
  const [selectedDoc, setSelectedDoc] = useState<(typeof documents)[0] | null>(null)

  const handleDrag = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true)
      } else if (e.type === "dragleave") {
        setDragActive(false)
      }
    },
    []
  )

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    // Mock file handling
  }, [])

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Document Verification
        </h2>
        <p className="text-muted-foreground">
          Upload and verify documents required for scheme applications. OCR will automatically extract key information.
        </p>
      </div>

      {/* Upload Zone */}
      <Card className="border border-border">
        <CardContent className="p-6">
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={cn(
              "flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 transition-colors",
              dragActive
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50 hover:bg-muted/30"
            )}
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <Upload className="h-7 w-7 text-primary" />
            </div>
            <h3 className="mb-1 text-base font-semibold text-card-foreground">
              Upload Documents
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Drag and drop files here, or click to browse
            </p>
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Browse Files
            </Button>
            <p className="mt-3 text-xs text-muted-foreground">
              Supported: PDF, JPG, PNG (Max 10MB)
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Document List */}
        <div className="lg:col-span-2">
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="font-display text-lg font-semibold">
                Your Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 pt-0">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDoc(doc)}
                  className={cn(
                    "flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-all hover:shadow-sm",
                    selectedDoc?.id === doc.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-muted/30"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                      doc.status === "verified"
                        ? "bg-emerald-50"
                        : doc.status === "pending"
                          ? "bg-amber-50"
                          : "bg-red-50"
                    )}
                  >
                    <FileText
                      className={cn(
                        "h-5 w-5",
                        doc.status === "verified"
                          ? "text-emerald-600"
                          : doc.status === "pending"
                            ? "text-amber-600"
                            : "text-red-600"
                      )}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="truncate text-sm font-semibold text-card-foreground">
                        {doc.name}
                      </h4>
                      <StatusBadge status={doc.status} />
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {doc.type} &middot; Uploaded on{" "}
                      {new Date(doc.uploadDate).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View document</span>
                    </Button>
                    {doc.status === "needs_reupload" && (
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <RotateCcw className="h-4 w-4" />
                        <span className="sr-only">Re-upload document</span>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* OCR Preview */}
        <div>
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="font-display text-lg font-semibold">
                {selectedDoc ? "Extracted Data (OCR)" : "OCR Preview"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDoc ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-card-foreground">
                      {selectedDoc.name}
                    </h4>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => setSelectedDoc(null)}
                    >
                      <X className="h-3.5 w-3.5" />
                      <span className="sr-only">Close preview</span>
                    </Button>
                  </div>
                  <StatusBadge status={selectedDoc.status} />
                  <Separator />
                  {selectedDoc.extractedData ? (
                    <div className="flex flex-col gap-3">
                      {Object.entries(selectedDoc.extractedData).map(
                        ([key, value]) => (
                          <div key={key}>
                            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </Label>
                            <p className="mt-0.5 text-sm font-medium text-card-foreground">
                              {value}
                            </p>
                          </div>
                        )
                      )}
                      <div className="mt-2 flex items-center gap-2 rounded-lg bg-emerald-50 p-2.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        <span className="text-xs font-medium text-emerald-700">
                          Data successfully extracted via OCR
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 rounded-lg bg-red-50 p-2.5">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <span className="text-xs font-medium text-red-700">
                        Could not extract data. Please re-upload a clear image.
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center py-8 text-center">
                  <FileText className="mb-3 h-10 w-10 text-muted-foreground/30" />
                  <p className="text-sm text-muted-foreground">
                    Select a document to view extracted data
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
