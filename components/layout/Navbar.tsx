"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";


   
  
   export default function Navbar() {
  const pathname = usePathname();

  const radarPaths = [
    "/category/commerce-sales",
    "/category/affiliate-marketing-management",
    "/category/channel-partner-local-marketing",
    "/category/conversational-intelligence",
    "/category/demand-generation",
    "/category/ecommerce",
    "/category/retail-proximity-iot-marketing",
    "/category/predictive-analytics",

    "/category/content-experience",
    "/category/chatbots-conversational-ai",
    "/category/cm-webexperience",
    "/category/customer-engagement",
    "/category/content-marketing",
    "/category/mobile-apps",
    "/category/digital-asset-management",
    "/category/email-marketing",
    "/category/intreactive-content",
    "/category/marketing-automation",
    "/category/marketing-technology",

    "/category/seo",

    "/category/data-management",
    "/category/audience-marketingdata",
    "/category/business-customerintelligence",
    "/category/customer-data-platform",
    "/category/data-analytics",
    "/category/dmp",
    "/category/ipass-cloud-data-integration",

    
  ];

  const isRadarActive = radarPaths.some(
    (path) =>
      pathname === path ||
      pathname.startsWith(`${path}/`)
  );


  const insightsPaths = [
  "/category/marketing",

  "/category/adtech",
  "/category/digital-marketing",
  "/category/digital-advertising",
  "/category/display-programatic-advertising",
  "/category/mobile-advertising",
  "/category/mobile-marketing",
  "/category/native-content-advertising",
  "/category/ppc",
  "/category/pr",
  "/category/performane-marketing",
  "/category/search-social-advertising",
  "/category/video-advertising",

  "/category/customer-experience",

  "/category/social-realtionship",
  "/category/abm",
  "/category/advocacy-loyalty-referrals",
  "/category/crm",
  "/category/insurance",
  "/category/customer-experience-service-success",
  "/category/events-meetings-webinar",
  "/category/influencers",
  "/category/socialmeida-marketing",
  "/category/market-intelligence",

  "/category/banking",
  "/category/payments",
  "/category/security",
  "/category/blockchain",
  "/category/investments",
  "/category/crowdfunding",
];

const isInsightsActive = insightsPaths.some(
  (path) =>
    pathname === path ||
    pathname.startsWith(`${path}/`)
);
  const isActive = (path: string) =>
    pathname === path ||
    pathname.startsWith(`${path}/`);


  return (
    <>
      {/* LOGO SECTION */}
      <div className="bg-[#F8F8FC]">
        <div className="max-w-7xl mx-auto px-6 h-[90px] flex items-center justify-between">

          {/* Logo */}
          <Link href="/">
            <Image
              src="/images/TheTechGossipLogo.png"
              alt="The Tech Gossip"
              width={300}
              height={100}
              className="w-[200px] h-auto"
            />
          </Link>

          {/* Social Icons */}
         <ul className="flex items-center gap-3 list-none m-0 p-0">
  {/* Facebook */}
  <li>
    <a
      href="https://www.facebook.com/koiNetMediaITES"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Facebook"
      className="w-12 h-12 rounded-full bg-[#1769E8] flex items-center justify-center text-white text-[24px] shadow-md hover:scale-105 transition-transform duration-200"
    >
      <FaFacebookF />
    </a>
  </li>

  {/* Instagram */}
  <li>
    <a
      href="https://www.instagram.com/koinetmedia/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
      className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4F5BD5] via-[#D62976] to-[#FEDA75] flex items-center justify-center text-white text-[24px] shadow-md hover:scale-105 transition-transform duration-200"
    >
      <FaInstagram />
    </a>
  </li>

  {/* Twitter / X */}
  <li>
    <a
      href="https://x.com/i/flow/login?redirect_after_login=%2FMediaKoinet"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="X"
      className="w-12 h-12 rounded-full bg-[#1DA1F2] flex items-center justify-center text-white text-[23px] shadow-md hover:scale-105 transition-transform duration-200"
    >
      <FaTwitter />
    </a>
  </li>

  {/* LinkedIn */}
  <li>
    <a
      href="https://www.linkedin.com/company/koinet-media/mycompany/verification/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
      className="w-12 h-12 rounded-full bg-[#078B8D] flex items-center justify-center text-white text-[23px] shadow-md hover:scale-105 transition-transform duration-200"
    >
      <FaLinkedinIn />
    </a>
  </li>
</ul>

        </div>
      </div>


      {/* NAVIGATION BAR */}
      <nav className="bg-[#078B8D]">
        <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">

          {/* Navigation */}
          <div className="flex items-center gap-8 text-white font-semibold">

            <Link
  href="/"
  className={`relative transition ${
    isActive("/")
      ? "text-white after:absolute after:left-0 after:right-0 after:-bottom-2 after:h-[3px] after:bg-white"
      : "hover:text-gray-200"
  }`}
>
  Home
</Link>

            <Link
  href="/news"
  className={`relative transition ${
    pathname === "/news"
      ? "text-white after:absolute after:left-0 after:right-0 after:-bottom-2 after:h-[3px] after:bg-white"
      : "hover:text-gray-200"
  }`}
>
  News
</Link>

           {/* Radar */}
{/* Radar */}
<div className="relative group">
  <button
  className={`relative flex items-center gap-2 transition ${
    isRadarActive
      ? "text-white after:absolute after:left-0 after:right-0 after:-bottom-2 after:h-[3px] after:bg-white"
      : "hover:text-gray-200"
  }`}
>
  TheTechGossip Radar

  <svg
    className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
</button>

  {/* pt-2 keeps hover alive between button and panel */}
  <div className="absolute left-0 top-full pt-2 hidden group-hover:block z-50">
    {/* NO overflow-hidden here, or the submenu gets clipped */}
    <div className="w-[300px] bg-white rounded-xl shadow-2xl border border-gray-100">
      <div className="p-2">

        {/* Commerce & Sales + flyout submenu */}
        <div className="relative group/commerce">
          <Link
            href="/category/commerce-sales"
            className="flex items-center justify-between px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1  transition-all duration-200 text-[16px] font-medium"
          >
            <span>Commerce &amp; Sales</span>
            <span className="text-xl">›</span>
          </Link>

          <div className="absolute left-full top-0 pl-2 hidden group-hover/commerce:block z-[60]">
            <div className="w-[340px] bg-white rounded-xl shadow-2xl border border-gray-100">
              <div className="p-2">
                <Link href="/category/affiliate-marketing-management" className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 text-[16px] font-medium">
                  Affiliate Marketing &amp; Management
                </Link>
                <Link href="/category/channel-partner-local-marketing" className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 text-[16px] font-medium">
                  Channel, Partner &amp; Local Marketing
                </Link>
                <Link href="/category/conversational-intelligence" className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 text-[16px] font-medium">
                  Conversational Intelligence
                </Link>
                <Link href="/category/demand-generation" className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 text-[16px] font-medium">
                  Demand Generation
                </Link>
                <Link href="/category/ecommerce" className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 text-[16px] font-medium">
                  Ecommerce
                </Link>
                <Link href="/category/retail-proximity-iot-marketing" className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 text-[16px] font-medium">
                  Retail, Proximity &amp; IoT Marketing
                </Link>
                <Link href="/category/predictive-analytics" className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 text-[16px] font-medium">
                  Predictive Analytics
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* E-commerce */}
        <div className="relative group/commerce">
          <Link
            href="/category/content-experience"
            className="flex items-center justify-between px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1  transition-all duration-200 text-[16px] font-medium"
          >
            <span>Content &amp; Experience</span>
            <span className="text-xl">›</span>
          </Link>

          <div className="absolute left-full top-0 pl-2 hidden group-hover/commerce:block z-[60]">
            <div className="w-[340px] bg-white rounded-xl shadow-2xl border border-gray-100">
              <div className="p-2">
                <Link href="/category/chatbots-conversational-ai" className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 text-[16px] font-medium">
                  chatbots-conversational-ai
                </Link>
                <Link href="/category/cm-webexperience" className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 text-[16px] font-medium">
                  CMS &amp; Web Experience Management
                </Link>
                <Link href="/category/customer-engagement" className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 text-[16px] font-medium">
                 Customer Engagement
                </Link>
                <Link href="/category/content-marketing" className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 text-[16px] font-medium">
                 Content Marketing
                </Link>
                <Link href="/category/mobile-apps" className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 text-[16px] font-medium">
                  Mobile Apps
                </Link>
                <Link href="/category/digital-asset-management" className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 text-[16px] font-medium">
                 Digital Asset Management
                </Link>
                <Link href="/category/email-marketing" className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 text-[16px] font-medium">
                Email Marketing
                </Link>
                <Link href="/category/intreactive-content" className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 text-[16px] font-medium">
               Interactive Content
                </Link>

                <Link href="/category/marketing-automation" className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 text-[16px] font-medium">
              Marketing Automation
                </Link>

                <Link href="/category/marketing-technology" className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 text-[16px] font-medium">
             Marketing Technology
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Digital Commerce */}
        <Link
          href="/category/seo"
            className="flex items-center justify-between px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1  transition-all duration-200 text-[16px] font-medium"
        >
          <span className="font-medium">SEO</span>
        </Link>

         <div className="relative group/commerce">
          <Link
            href="/category/data-management"
            className="flex items-center justify-between px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1  transition-all duration-200 text-[16px] font-medium"
          >
            <span>Data Management</span>
            <span className="text-xl">›</span>
          </Link>

          <div className="absolute left-full top-0 pl-2 hidden group-hover/commerce:block z-[60]">
            <div className="w-[340px] bg-white rounded-xl shadow-2xl border border-gray-100">
              <div className="p-2">
                <Link href="/category/audience-marketingdata" className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 text-[16px] font-medium">
                  Audience/Marketing Data &amp; Data Enhancement
                </Link>
                <Link href="/category/business-customerintelligence" className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 text-[16px] font-medium">
                 Business/Customer Intelligence &amp; Data Science
                </Link>
                <Link href="/category/customer-data-platform" className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 text-[16px] font-medium">
                 Customer Data Platform
                </Link>
                <Link href="/category/data-analytics" className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 text-[16px] font-medium">
                 Data Analytics
                </Link>
                <Link href="/category/dmp" className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 text-[16px] font-medium">
                 DMP
                </Link>
                <Link href="/category/ipass-cloud-data-integration" className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 text-[16px] font-medium">
                 iPaaS, Cloud/Data Integration &amp; Tag Management
                </Link>
               

                
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</div>


{/* Insights */}
<div className="relative group">
 <button
  className={`relative flex items-center gap-2 transition ${
    isInsightsActive
      ? "text-white after:absolute after:left-0 after:right-0 after:-bottom-2 after:h-[3px] after:bg-white"
      : "hover:text-gray-200"
  }`}
>
  TheTechGossip Insights

  <svg
    className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
</button>

  {/* Main Dropdown */}
  <div className="absolute left-0 top-full hidden group-hover:block z-50">
    <div className="w-[270px] bg-white rounded-xl shadow-2xl border border-gray-100">

      <div className="p-2">

        {/* Advertising & Promotion + Submenu */}
        <div className="relative group/advertising">

          <Link
            href="/category/marketing"
            className="flex items-center justify-between px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200"
          >
            <span className="font-medium">
              Advertising &amp; Promotion
            </span>

            {/* Right Arrow */}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>

          {/* Advertising Submenu */}
          <div className="absolute left-full top-0 hidden group-hover/advertising:block z-50">
            <div className="w-[280px] bg-white rounded-xl shadow-2xl border border-gray-100 p-2">

              <Link
                href="/category/adtech"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
                Adtech
              </Link>

              <Link
                href="/category/digital-marketing"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
               Digital Marketing
              </Link>

              <Link
                href="/category/digital-advertising"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
                Digital Advertising
              </Link>

              <Link
                href="/category/display-programatic-advertising"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
                Display &amp; Programmatic Advertising
              </Link>

              <Link
                href="/category/mobile-advertising"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
               Mobile Advertising
              </Link>

              <Link
                href="/category/mobile-marketing"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
                Mobile Marketing
              </Link>

              <Link
                href="/category/native-content-advertising"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
                Native/Content Advertising
              </Link>

               <Link
                href="/category/ppc"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
                PPC
              </Link>

               <Link
                href="/category/pr"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
                PR
              </Link>

               <Link
                href="/category/performane-marketing"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
               Performance Marketing
              </Link>

               <Link
                href="/category/search-social-advertising"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
               Search &amp; Social Advertising
              </Link>

              <Link
                href="/category/video-advertising"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
               Video Advertising
              </Link>

            </div>
          </div>
        </div>

        {/* Interviews */}
        <Link
          href="/category/customer-experience"
          className="group/item flex items-center px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200"
        >
          <span className="font-medium">Interviews</span>
        </Link>

        {/* Infographics */}
        <div className="relative group/advertising">

          <Link
            href="/category/marketing"
            className="flex items-center justify-between px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200"
          >
            <span className="font-medium">
              Infographics
            </span>

            {/* Right Arrow */}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>

          {/* Advertising Submenu */}
          <div className="absolute left-full top-0 hidden group-hover/advertising:block z-50">
            <div className="w-[280px] bg-white rounded-xl shadow-2xl border border-gray-100 p-2">

              <Link
                href="/category/adtech"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
               Analytics
              </Link>

              <Link
                href="/category/digital-marketing"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
             E-Learning
              </Link>

              <Link
                href="/category/digital-advertising"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
                Audio
              </Link>


            </div>
          </div>
        </div>

        {/* Social & Relationships */}
        <div className="relative group/advertising">

          <Link
            href="/category/social-realtionship"
            className="flex items-center justify-between px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
          >
            <span className="font-medium">
             Social &amp; Relationships
            </span>

            {/* Right Arrow */}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>

          {/* Advertising Submenu */}
          <div className="absolute left-full top-0 hidden group-hover/advertising:block z-50">
            <div className="w-[280px] bg-white rounded-xl shadow-2xl border border-gray-100 p-2">

              <Link
                href="/category/abm"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
                ABM
              </Link>

              <Link
                href="/category/advocacy-loyalty-referrals"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
              Advocacy, Loyalty &amp; Referrals
              </Link>

              <Link
                href="/category/crm"
                className="block px-4 py-3 rounded-lg text-black hover:bg-[#078B8D] hover:text-[#078B8D] hover:translate-x-1 duration-200 font-medium"
              >
                CRM
              </Link>

              <Link
                href="/category/insurance"
                className="block px-4 py-3 rounded-lg text-black hover:bg-[#078B8D] hover:text-[#078B8D] hover:translate-x-1 duration-200 font-medium"
              >
               Insurance
              </Link>

              <Link
                href="/category/customer-experience-service-success"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
             Customer Experience, Service &amp; Success
              </Link>

              <Link
                href="/category/events-meetings-webinar"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
                Events, Meetings &amp; Webinars
              </Link>

              <Link
                href="/category/influencers"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
               Influencers
              </Link>

               <Link
                href="/category/socialmeida-marketing"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
               Social Media Marketing &amp; Monitoring
              </Link>

               <Link
                href="/category/market-intelligence"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
               Market Intelligence
              </Link>

              

            </div>
          </div>
        </div>

        {/* Banking */}
        <div className="relative group/advertising">

          <Link
            href="/category/banking"
            className="flex items-center justify-between px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
          >
            <span className="font-medium">
            Banking
            </span>

            {/* Right Arrow */}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>

          {/* Advertising Submenu */}
          <div className="absolute left-full top-0 hidden group-hover/advertising:block z-50">
            <div className="w-[280px] bg-white rounded-xl shadow-2xl border border-gray-100 p-2">

              <Link
                href="/category/payments"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
                Payments
              </Link>

              <Link
                href="/category/security"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
              Security
              </Link>

              <Link
                href="/category/blockchain"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
                Blockchain
              </Link>

              <Link
                href="/category/investments"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
               Investments
              </Link>

              <Link
                href="/category/crowdfunding"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
            Crowdfunding
              </Link>

              

            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</div>


{/* AI Compass */}
<div className="relative group">
  <button className="flex items-center gap-2 hover:text-gray-200 transition">
     AI Compass

    <svg
      className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </button>

  {/* Main Dropdown */}
  <div className="absolute left-0 top-full hidden group-hover:block z-50">
    <div className="w-[270px] bg-white rounded-xl shadow-2xl border border-gray-100">

      <div className="p-2">

        {/* Advertising & Promotion + Submenu */}
        <div className="relative group/advertising">

          <Link
            href="/category/ai"
            className="flex items-center justify-between px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
          >
            <span className="font-medium">
             AI
            </span>

            {/* Right Arrow */}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>

          {/* Advertising Submenu */}
          <div className="absolute left-full top-0 hidden group-hover/advertising:block z-50">
            <div className="w-[280px] bg-white rounded-xl shadow-2xl border border-gray-100 p-2">

              <Link
                href="/category/machine-learning"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
                Machine Learning
              </Link>

              <Link
                href="/category/hr-technology"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
              HR Technology
              </Link>

              <Link
                href="/category/advertising-promotion"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
                Advertising &amp; Promotion
              </Link>

              <Link
                href="/category/automation"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
                Automation
              </Link>

              <Link
                href="/category/organization-development"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
               Organization &amp; Development
              </Link>

              <Link
                href="/category/technology"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
              Technology
              </Link>

              <Link
                href="/category/information-technology"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
                Information Technology
              </Link>

               <Link
                href="/category/trend-based"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
                Trend based
              </Link>

               

            </div>
          </div>
        </div>

    
        {/* Infographics */}
        <div className="relative group/advertising">

          <Link
            href="/category/account-based-marketing"
            className="flex items-center justify-between px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
          >
            <span className="font-medium">
              Account Based Marketing
            </span>

            {/* Right Arrow */}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>

          {/* Advertising Submenu */}
          <div className="absolute left-full top-0 hidden group-hover/advertising:block z-50">
            <div className="w-[280px] bg-white rounded-xl shadow-2xl border border-gray-100 p-2">

              <Link
                href="/category/privacy-regulations"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
              Privacy and Regulations
              </Link>

              <Link
                href="/category/apps-for-business"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
           Apps for Business
              </Link>

              <Link
                href="/category/b2b-data"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
                B2B Data
              </Link>

              <Link
                href="/category/behavioural-marketing"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
                Behavioral Marketing
              </Link>

               <Link
                href="/category/brand-safety"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
                Brand Safety
              </Link>

     <Link
                href="/category/cyber-security"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
                Cyber Security
              </Link>

 <Link
                href="/category/platform"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
               Platforms
              </Link>

               <Link
                href="/category/Whitepapers"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
                Whitepapers
              </Link>

            </div>
          </div>
        </div>

        {/* Social & Relationships */}
        <div className="relative group/advertising">

          <Link
            href="/category/people-based-marketing"
            className="flex items-center justify-between px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
          >
            <span className="font-medium">
             People-Based Marketing
            </span>

            {/* Right Arrow */}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>

          {/* Advertising Submenu */}
          <div className="absolute left-full top-0 hidden group-hover/advertising:block z-50">
            <div className="w-[280px] bg-white rounded-xl shadow-2xl border border-gray-100 p-2">

              <Link
                href="/category/content-advertising"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
                Content Advertising
              </Link>

              <Link
                href="/category/sales-analytics"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
             Sales Analytics
              </Link>

              <Link
                href="/category/sales-automation-enablement"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
               Sales Automation, Enablement &amp; Intelligence
              </Link>

              <Link
                href="/category/social-commerce"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
             Social Commerce
              </Link>

              <Link
                href="/category/ebooks"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
             Ebooks
              </Link>

              <Link
                href="/category/sass"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
                Sass
              </Link>

              <Link
                href="/category/healthtech"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
               Helthtech
              </Link>

               <Link
                href="/category/resources"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
              Resources
              </Link>

               <Link
                href="/category/networking"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
               Networking
              </Link>

 <Link
                href="/category/sourcing"
                className="block px-4 py-3 rounded-lg text-black hover:text-[#078B8D] hover:translate-x-1 transition-all duration-200 font-medium"
              >
               Sourcing
              </Link>
              

            </div>
          </div>
        </div>

       
      </div>
    </div>
  </div>
</div>

            <Link
              href="/resources"
              className="hover:text-gray-200 transition"
            >
              Resources
            </Link>

          </div>


          {/* Right side */}
          <div className="flex items-center gap-6">

            {/* Search */}
            <button
              type="button"
              aria-label="Search"
              className="text-white hover:text-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </button>

            {/* Contact */}
           <Link
  href="/contact"
  className="bg-[#0B1235] text-white px-6 py-3 font-semibold 
             transition-all duration-300 ease-in-out
             hover:bg-[#151d4d] hover:-translate-y-1 hover:shadow-lg"
>
  Contact Us
</Link>

          </div>

        </div>
      </nav>
    </>
  );
}