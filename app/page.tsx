"use client"

import { useRef, useState } from "react"
import html2canvas from "html2canvas"
import { Download, Phone, Globe, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function EPHSignature() {
  const signatureRef = useRef<HTMLDivElement>(null)
  const [name, setName] = useState("Mkhanyisi Simelane")
  const [jobTitle, setJobTitle] = useState("IT Technician")
  const [phone1, setPhone1] = useState("+268 2417 9700")
  const [phone2, setPhone2] = useState("+268 7602 9885")

  const downloadSignature = async () => {
    if (!signatureRef.current) return

    try {
      // Wait for images to load
      const images = signatureRef.current.querySelectorAll("img")
      await Promise.all(
        Array.from(images).map((img) => {
          return new Promise((resolve, reject) => {
            if (img.complete) {
              resolve(img)
            } else {
              img.onload = () => resolve(img)
              img.onerror = () => reject(new Error(`Failed to load image: ${img.src}`))
            }
          })
        }),
      )

      // Create canvas with 8K resolution
      const canvas = await html2canvas(signatureRef.current, {
        scale: 8, // 8K resolution scaling
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#ffffff",
        width: signatureRef.current.offsetWidth,
        height: signatureRef.current.offsetHeight,
        logging: false,
        imageTimeout: 15000,
        onclone: (clonedDoc) => {
          // Ensure all images are loaded before capturing
          const images = clonedDoc.querySelectorAll("img")
          images.forEach((img) => {
            img.crossOrigin = "anonymous"
          })
        },
      })

      // Create download link
      const link = document.createElement("a")
      link.download = "eph-signature-8k.png"
      link.href = canvas.toDataURL("image/png", 1.0)
      link.click()
    } catch (error) {
      console.error("Error generating signature:", error)
      alert("Error generating signature. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">EPH Email Signature Generator</h1>
          <p className="text-gray-600 mb-6">Generate and download your professional email signature</p>
        </div>

        {/* Customization Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Customize Your Signature</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="Enter your job title"
                />
              </div>
              <div>
                <Label htmlFor="phone1">Phone Number 1</Label>
                <Input
                  id="phone1"
                  value={phone1}
                  onChange={(e) => setPhone1(e.target.value)}
                  placeholder="Enter first phone number"
                />
              </div>
              <div>
                <Label htmlFor="phone2">Phone Number 2</Label>
                <Input
                  id="phone2"
                  value={phone2}
                  onChange={(e) => setPhone2(e.target.value)}
                  placeholder="Enter second phone number"
                />
              </div>
            </div>
            <div className="flex justify-center pt-4">
              <Button onClick={downloadSignature}>
                <Download className="w-4 h-4 mr-2" />
                Download 8K PNG
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Signature Component */}
        <div
          ref={signatureRef}
          className="max-w-[900px] mx-auto border border-gray-300 rounded-md bg-white overflow-hidden shadow-lg"
        >
          {/* Color Stripe */}
          <div className="flex h-3">
            <div className="flex-1 bg-[#00b3e3]"></div>
            <div className="flex-1 bg-[#f37021]"></div>
            <div className="flex-1 bg-[#e84c3d]"></div>
            <div className="flex-1 bg-[#f8f9fa]"></div>
          </div>

          {/* Main Section */}
          <div className="flex">
            {/* Info Section */}
            <div className="flex-1 p-8 flex justify-center items-center text-center">
              <div className="inline-block">
                <h2 className="mt-5 mb-0 text-[28px] font-semibold text-gray-800">{name}</h2>
                <div className="h-0.5 bg-gray-800 my-2 w-full"></div>
                <p className="m-0 text-base text-gray-600">{jobTitle}</p>

                {/* Properly centered logo with equal spacing */}
                <div className="flex flex-col items-center">
                  <div className="h-4"></div> {/* Top spacer */}
                  <img className="max-h-12" src="/images/eph-logo.png" alt="EPH Logo" crossOrigin="anonymous" />
                  <div className="h-4"></div> {/* Bottom spacer */}
                </div>

                <p className="italic text-[13px] text-[#00a99d] m-0">Ezulwini Private Hospital</p>
              </div>
            </div>

            {/* Subtle 3D Vertical Divider */}
            <div className="relative">
              <div
                className="w-[1px] h-full relative"
                style={{
                  background: "linear-gradient(to right, #f8f9fa 0%, #f1f3f4 50%, #e9ecef 100%)",
                  boxShadow: `
        inset 1px 0 0 rgba(255, 255, 255, 0.4),
        inset -1px 0 0 rgba(0, 0, 0, 0.05),
        1px 0 1px rgba(0, 0, 0, 0.02),
        -1px 0 1px rgba(255, 255, 255, 0.1)
      `,
                }}
              >
                {/* Left subtle highlight */}
                <div
                  className="absolute left-0 top-0 w-[1px] h-full"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.05) 100%)",
                  }}
                ></div>
              </div>
            </div>

            {/* Contacts Section */}
            <div className="flex-1 pt-[60px] pb-8 px-8 text-[13px] text-gray-700">
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-gradient-to-br from-[#00b3e3] to-[#0099cc] rounded-full flex items-center justify-center mr-2.5 flex-shrink-0 shadow-sm">
                    <Phone className="w-3 h-3 text-white" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs text-gray-500 mr-2">Phone:</span>
                    <span className="leading-relaxed">{[phone1, phone2].filter(Boolean).join(", ")}</span>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-6 h-6 bg-gradient-to-br from-[#f37021] to-[#e55a00] rounded-full flex items-center justify-center mr-2.5 flex-shrink-0 shadow-sm">
                    <Globe className="w-3 h-3 text-white" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs text-gray-500 mr-2">Website:</span>
                    <a
                      href="https://www.eph-sz.com"
                      target="_blank"
                      className="text-[#00a99d] no-underline hover:underline"
                      rel="noreferrer"
                    >
                      www.eph-sz.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-6 h-6 bg-gradient-to-br from-[#00a99d] to-[#008a7a] rounded-full flex items-center justify-center mr-2.5 flex-shrink-0 shadow-sm">
                    <MapPin className="w-3 h-3 text-white" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs text-gray-500 mr-2">Address:</span>
                    <span>60/850, 60 MR103, Ezulwini, Eswatini</span>
                  </div>
                </div>

                {/* Colored Logo SVG */}
                <div className="flex items-center pt-6">
                  <Image
                    src="/images/colored-logo.svg"
                    alt="EPH Colored Logo"
                    width={110}
                    height={110}
                    className="opacity-90"
                    crossOrigin="anonymous"
                  />
                  <Image
                    src="/images/cohsasa-badge.png"
                    alt="COHSASA Accredited Badge"
                    width={40}
                    height={40}
                    className="ml-4 opacity-90"
                    crossOrigin="anonymous"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer with Water-like Wave Effect */}
          <div className="relative">
            {/* Drop shadow for 3D effect */}
            <div
              className="absolute inset-0 z-0"
              style={{
                filter: "drop-shadow(0 -2px 4px rgba(0, 0, 0, 0.1))",
              }}
            >
              <svg
                className="w-full h-16"
                viewBox="0 0 900 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <defs>
                  {/* Water-like gradient */}
                  <linearGradient id="waterGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2dd4bf" />
                    <stop offset="25%" stopColor="#06b6d4" />
                    <stop offset="50%" stopColor="#0ea5e9" />
                    <stop offset="75%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#1e40af" />
                  </linearGradient>

                  {/* Light reflection gradient */}
                  <linearGradient id="reflectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255, 255, 255, 0.1)" />
                    <stop offset="30%" stopColor="rgba(255, 255, 255, 0.3)" />
                    <stop offset="50%" stopColor="rgba(255, 255, 255, 0.4)" />
                    <stop offset="70%" stopColor="rgba(255, 255, 255, 0.2)" />
                    <stop offset="100%" stopColor="rgba(255, 255, 255, 0.05)" />
                  </linearGradient>
                </defs>

                {/* Dynamic swoosh curve */}
                <path
                  d="M0,64 C120,20 180,35 300,25 C420,15 480,40 600,30 C720,20 780,45 900,35 L900,64 Z"
                  fill="url(#waterGradient)"
                />

                {/* Light reflection streak */}
                <path
                  d="M0,64 C120,20 180,35 300,25 C420,15 480,40 600,30 C720,20 780,45 900,35 L900,50 C780,60 720,35 600,45 C480,55 420,30 300,40 C180,50 120,35 0,79 Z"
                  fill="url(#reflectionGradient)"
                />
              </svg>
            </div>

            {/* Footer content */}
            <div className="relative z-10 pt-8 pb-4 px-6 flex justify-end items-center text-white">
              <div className="flex items-center gap-4">
                <a
                  href="https://www.instagram.com/ezulwini_private_hospital"
                  target="_blank"
                  className="text-white no-underline text-lg hover:text-gray-200 transition-colors"
                  rel="noreferrer"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="https://www.facebook.com/ezulwiniprivatehospital"
                  target="_blank"
                  className="text-white no-underline text-lg hover:text-gray-200 transition-colors"
                  rel="noreferrer"
                >
                  <i className="fab fa-facebook"></i>
                </a>
                <a
                  href="https://www.linkedin.com/company/ezulwini-private-hospital/"
                  target="_blank"
                  className="text-white no-underline text-lg hover:text-gray-200 transition-colors"
                  rel="noreferrer"
                >
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
              <div className="ml-5 text-[15px] font-medium">Ezulwini Private Hospital</div>
            </div>
          </div>
        </div>

        {/* Mobile Responsive Version */}
        <div className="md:hidden">
          <div className="max-w-[900px] mx-auto border border-gray-300 rounded-md bg-white overflow-hidden shadow-lg">
            {/* Color Stripe */}
            <div className="flex h-3">
              <div className="flex-1 bg-[#00b3e3]"></div>
              <div className="flex-1 bg-[#f37021]"></div>
              <div className="flex-1 bg-[#e84c3d]"></div>
              <div className="flex-1 bg-[#f8f9fa]"></div>
            </div>

            {/* Main Section - Mobile */}
            <div className="flex flex-col text-center">
              {/* Info Section */}
              <div className="p-5 max-w-full">
                <h2 className="mt-5 mb-0 text-[28px] font-semibold text-gray-800">{name}</h2>
                <div className="h-0.5 bg-gray-800 my-2 w-full"></div>
                <p className="m-0 text-base text-gray-600">{jobTitle}</p>

                {/* Properly centered logo with equal spacing */}
                <div className="flex flex-col items-center">
                  <div className="h-4"></div> {/* Top spacer */}
                  <img className="max-h-12" src="/images/eph-logo.png" alt="EPH Logo" crossOrigin="anonymous" />
                  <div className="h-4"></div> {/* Bottom spacer */}
                </div>

                <p className="italic text-[13px] text-[#00a99d] m-0">Ezulwini Private Hospital</p>
              </div>

              {/* Contacts Section */}
              <div className="p-5 text-[13px] text-gray-700 max-w-full">
                <div className="space-y-3">
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 bg-gradient-to-br from-[#00b3e3] to-[#0099cc] rounded-full flex items-center justify-center mr-2.5 flex-shrink-0 shadow-sm">
                      <Phone className="w-3 h-3 text-white" />
                    </div>
                    <div className="flex-1 text-center">
                      <span className="text-xs text-gray-500 mr-2">Phone:</span>
                      <span className="leading-relaxed">{[phone1, phone2].filter(Boolean).join(", ")}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 bg-gradient-to-br from-[#f37021] to-[#e55a00] rounded-full flex items-center justify-center mr-2.5 flex-shrink-0 shadow-sm">
                      <Globe className="w-3 h-3 text-white" />
                    </div>
                    <div className="flex-1 text-center">
                      <span className="text-xs text-gray-500 mr-2">Website:</span>
                      <a
                        href="https://www.eph-sz.com"
                        target="_blank"
                        className="text-[#00a99d] no-underline hover:underline"
                        rel="noreferrer"
                      >
                        www.eph-sz.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 bg-gradient-to-br from-[#00a99d] to-[#008a7a] rounded-full flex items-center justify-center mr-2.5 flex-shrink-0 shadow-sm">
                      <MapPin className="w-3 h-3 text-white" />
                    </div>
                    <div className="flex-1 text-center">
                      <span className="text-xs text-gray-500 mr-2">Address:</span>
                      <span>60/850, 60 MR103, Ezulwini, Eswatini</span>
                    </div>
                  </div>

                  {/* Colored Logo SVG and COHSASA Badge */}
                  <div className="flex justify-center gap-4 mt-4 pt-2">
                    <img
                      src="/images/colored-logo.svg"
                      alt="EPH Colored Logo"
                      className="h-10 w-auto opacity-90"
                      crossOrigin="anonymous"
                    />
                    <img
                      src="/images/cohsasa-badge.png"
                      alt="COHSASA Accredited Badge"
                      className="h-10 w-auto opacity-90"
                      crossOrigin="anonymous"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer - Mobile */}
            <div className="relative">
              {/* Drop shadow for 3D effect */}
              <div
                className="absolute inset-0 z-0"
                style={{
                  filter: "drop-shadow(0 -2px 4px rgba(0, 0, 0, 0.1))",
                }}
              >
                <svg
                  className="w-full h-16"
                  viewBox="0 0 900 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <defs>
                    {/* Water-like gradient */}
                    <linearGradient id="waterGradientMobile" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#2dd4bf" />
                      <stop offset="25%" stopColor="#06b6d4" />
                      <stop offset="50%" stopColor="#0ea5e9" />
                      <stop offset="75%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#1e40af" />
                    </linearGradient>

                    {/* Light reflection gradient */}
                    <linearGradient id="reflectionGradientMobile" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(255, 255, 255, 0.1)" />
                      <stop offset="30%" stopColor="rgba(255, 255, 255, 0.3)" />
                      <stop offset="50%" stopColor="rgba(255, 255, 255, 0.4)" />
                      <stop offset="70%" stopColor="rgba(255, 255, 255, 0.2)" />
                      <stop offset="100%" stopColor="rgba(255, 255, 255, 0.05)" />
                    </linearGradient>
                  </defs>

                  {/* Dynamic swoosh curve */}
                  <path
                    d="M0,64 C120,20 180,35 300,25 C420,15 480,40 600,30 C720,20 780,45 900,35 L900,64 Z"
                    fill="url(#waterGradientMobile)"
                  />

                  {/* Light reflection streak */}
                  <path
                    d="M0,64 C120,20 180,35 300,25 C420,15 480,40 600,30 C720,20 780,45 900,35 L900,50 C780,60 720,35 600,45 C480,55 420,30 300,40 C180,50 120,35 0,79 Z"
                    fill="url(#reflectionGradientMobile)"
                  />
                </svg>
              </div>

              {/* Footer content */}
              <div className="relative z-10 pt-8 pb-4 px-6 flex flex-col gap-2 text-white items-center">
                <div className="flex items-center gap-4">
                  <a
                    href="https://www.instagram.com/ezulwini_private_hospital"
                    target="_blank"
                    className="text-white no-underline text-lg hover:text-gray-200 transition-colors"
                    rel="noreferrer"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a
                    href="https://www.facebook.com/ezulwiniprivatehospital"
                    target="_blank"
                    className="text-white no-underline text-lg hover:text-gray-200 transition-colors"
                    rel="noreferrer"
                  >
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/ezulwini-private-hospital/"
                    target="_blank"
                    className="text-white no-underline text-lg hover:text-gray-200 transition-colors"
                    rel="noreferrer"
                  >
                    <i className="fab fa-linkedin"></i>
                  </a>
                </div>
                <div className="text-[15px] font-medium">Ezulwini Private Hospital</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
