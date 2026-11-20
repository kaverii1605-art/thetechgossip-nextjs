"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./page.css";

type Category = {
  value: string;
  label: string;
};

type CategoryGroup = {
  name: string;
  shortName: string;
  categories: Category[];
};

const categoryGroups: CategoryGroup[] = [

  {
    "name": "TheTechGossip Radar",
    "shortName": "Radar",
    "categories": [
      {
        "value": "commerce-sales",
        "label": "Commerce & Sales"
      },
      {
        "value": "affiliate-marketing-management",
        "label": "Affiliate Marketing & Management"
      },
      {
        "value": "channel-partner-local-marketing",
        "label": "Channel, Partner & Local Marketing"
      },
      {
        "value": "conversational-intelligence",
        "label": "Conversational Intelligence"
      },
      {
        "value": "demand-generation",
        "label": "Demand Generation"
      },
      {
        "value": "ecommerce",
        "label": "Ecommerce"
      },
      {
        "value": "retail-proximity-iot-marketing",
        "label": "Retail, Proximity & IoT Marketing"
      },
      {
        "value": "predictive-analytics",
        "label": "Predictive Analytics"
      },
      {
        "value": "content-experience",
        "label": "Content & Experience"
      },
      {
        "value": "chatbots-conversational-ai",
        "label": "hatbots & Conversational AI"
      },
      {
        "value": "cm-webexperience",
        "label": "CMS & Web Experience Management"
      },
      {
        "value": "customer-engagement",
        "label": "Customer Engagement"
      },
      {
        "value": "content-marketing",
        "label": "Content Marketing"
      },
      {
        "value": "mobile-apps",
        "label": "Mobile Apps"
      },
      {
        "value": "digital-asset-management",
        "label": "Digital Asset Management"
      },
      {
        "value": "email-marketing",
        "label": "Email Marketing"
      },
      {
        "value": "intreactive-content",
        "label": "Interactive Content"
      },
      {
        "value": "marketing-automation",
        "label": "Marketing Automation"
      },
      {
        "value": "marketing-technology",
        "label": "Marketing Technology"
      },
      {
        "value": "seo",
        "label": "SEO"
      },
      {
        "value": "data-management",
        "label": "Data Management"
      },
      {
        "value": "audience-marketingdata",
        "label": "Audience/Marketing Data & Data Enhancement"
      },
      {
        "value": "business-customerintelligence",
        "label": "Business/Customer Intelligence & Data Science"
      },
      {
        "value": "customer-data-platform",
        "label": "Customer Data Platform"
      },
      {
        "value": "data-analytics",
        "label": "Data Analytics"
      },
      {
        "value": "dmp",
        "label": "DMP"
      },
      {
        "value": "ipass-cloud-data-integration",
        "label": "iPaaS, Cloud/Data Integration & Tag Management"
      }
    ]
  },
  {
    "name": "TheTechGossip Insights",
    "shortName": "Insights",
    "categories": [
      {
        "value": "marketing",
        "label": "Advertising & Promotion"
      },
      {
        "value": "adtech",
        "label": "Adtech"
      },
      {
        "value": "digital-marketing",
        "label": "Digital Marketing"
      },
      {
        "value": "digital-advertising",
        "label": "Digital Advertising"
      },
      {
        "value": "display-programatic-advertising",
        "label": "Display & Programmatic Advertising"
      },
      {
        "value": "mobile-advertising",
        "label": "Mobile Advertising"
      },
      {
        "value": "mobile-marketing",
        "label": "Mobile Marketing"
      },
      {
        "value": "native-content-advertising",
        "label": "Native/Content Advertising"
      },
      {
        "value": "ppc",
        "label": "PPC"
      },
      {
        "value": "pr",
        "label": "PR"
      },
      {
        "value": "performane-marketing",
        "label": "Performance Marketing"
      },
      {
        "value": "search-social-advertising",
        "label": "Search & Social Advertising"
      },
      {
        "value": "video-advertising",
        "label": "Video Advertising"
      },
      {
        "value": "customer-experience",
        "label": "Interviews"
      },
      {
        "value": "social-realtionship",
        "label": "Social & Relationships"
      },
      {
        "value": "abm",
        "label": "ABM"
      },
      {
        "value": "advocacy-loyalty-referrals",
        "label": "Advocacy, Loyalty & Referrals"
      },
      {
        "value": "crm",
        "label": "CRM"
      },
      {
        "value": "insurance",
        "label": "Insurance"
      },
      {
        "value": "customer-experience-service-success",
        "label": "Customer Experience, Service & Success"
      },
      {
        "value": "events-meetings-webinar",
        "label": "Events, Meetings & Webinars"
      },
      {
        "value": "influencers",
        "label": "Influencers"
      },
      {
        "value": "socialmeida-marketing",
        "label": "Social Media Marketing & Monitoring"
      },
      {
        "value": "market-intelligence",
        "label": "Market Intelligence"
      },
      {
        "value": "banking",
        "label": "Banking"
      },
      {
        "value": "payments",
        "label": "Payments"
      },
      {
        "value": "security",
        "label": "Security"
      },
      {
        "value": "blockchain",
        "label": "Blockchain"
      },
      {
        "value": "investments",
        "label": "Investments"
      },
      {
        "value": "crowdfunding",
        "label": "Crowdfunding"
      }
    ]
  },
  {
    "name": "AI Compass",
    "shortName": "AI Compass",
    "categories": [
      {
        "value": "ai",
        "label": "AI"
      },
      {
        "value": "machine-learning",
        "label": "Machine Learning"
      },
      {
        "value": "hr-technology",
        "label": "HR Technology"
      },
      {
        "value": "advertising-promotion",
        "label": "Advertising & Promotion"
      },
      {
        "value": "automation",
        "label": "Automation"
      },
      {
        "value": "organization-development",
        "label": "Organization & Development"
      },
      {
        "value": "technology",
        "label": "Technology"
      },
      {
        "value": "information-technology",
        "label": "Information Technology"
      },
      {
        "value": "trend-based",
        "label": "Trend Based"
      },
      {
        "value": "account-based-marketing",
        "label": "Account Based Marketing"
      },
      {
        "value": "privacy-regulations",
        "label": "Privacy and Regulations"
      },
      {
        "value": "apps-for-business",
        "label": "Apps for Business"
      },
      {
        "value": "b2b-data",
        "label": "B2B Data"
      },
      {
        "value": "behavioural-marketing",
        "label": "Behavioral Marketing"
      },
      {
        "value": "brand-safety",
        "label": "Brand Safety"
      },
      {
        "value": "cyber-security",
        "label": "Cyber Security"
      },
      {
        "value": "platform",
        "label": "Platforms"
      },
      {
        "value": "Whitepapers",
        "label": "Whitepapers"
      },
      {
        "value": "people-based-marketing",
        "label": "People-Based Marketing"
      },
      {
        "value": "content-advertising",
        "label": "Content Advertising"
      },
      {
        "value": "sales-analytics",
        "label": "Sales Analytics"
      },
      {
        "value": "sales-automation-enablement",
        "label": "Sales Automation, Enablement & Intelligence"
      },
      {
        "value": "social-commerce",
        "label": "Social Commerce"
      },
      {
        "value": "ebooks",
        "label": "Ebooks"
      },
      {
        "value": "sass",
        "label": "Sass"
      },
      {
        "value": "healthtech",
        "label": "Healthtech"
      },
      {
        "value": "resources",
        "label": "Resources"
      },
      {
        "value": "networking",
        "label": "Networking"
      },
      {
        "value": "sourcing",
        "label": "Sourcing"
      }
    ]
  }
] as const;









export default function AddNewsPage() {

  const router = useRouter();



  const [image, setImage] = useState("");

  const [imageFile, setImageFile] = useState<File | null>(null);

  const [imagePreview, setImagePreview] = useState("");



  useEffect(() => {

    const checkLogin = async () => {

      try {

        const response = await fetch("/api/admin/me");



        if (!response.ok) {

          router.replace("/admin");

          return;

        }

      } catch (error) {

        console.error("Session check failed:", error);

        router.replace("/admin");

      }

    };



    checkLogin();

  }, [router]);





  useEffect(() => {

    if (!imageFile) {

      setImagePreview("");

      return;

    }



    const previewUrl = URL.createObjectURL(imageFile);

    setImagePreview(previewUrl);



    return () => {

      URL.revokeObjectURL(previewUrl);

    };

  }, [imageFile]);





  const [heading, setHeading] = useState("");

  const [subHeading, setSubHeading] = useState("");

  const [category, setCategory] = useState("");
  const [activeCategoryGroup, setActiveCategoryGroup] = useState("TheTechGossip Radar");
  const [categorySearch, setCategorySearch] = useState("");

  const [content, setContent] = useState("");



  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");



  const createSlug = (text: string) => {

    return text

      .toLowerCase()

      .trim()

      .replace(/[^a-z0-9\s-]/g, "")

      .replace(/\s+/g, "-")

      .replace(/-+/g, "-");

  };



  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    if (!category) {
      setMessage("Please select a category.");
      return;
    }

    setLoading(true);

    setMessage("");



    const slug = createSlug(heading);



    try {

      let imagePath = image || null;



      // Step 1: Upload the selected image.

      if (imageFile) {

        const formData = new FormData();

        formData.append("image", imageFile);



        const uploadResponse = await fetch("/api/upload", {

          method: "POST",

          body: formData,

        });



        const uploadData = await uploadResponse.json();



        if (!uploadResponse.ok) {

          setMessage(uploadData.error || "Image upload failed.");

          return;

        }



        imagePath = uploadData.image;

      }



      // Step 2: Save the news article.

      const response = await fetch("/api/posts", {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

        },

        body: JSON.stringify({

          heading,

          subHeading,

          slug,

          category,

          image: imagePath,

          content,

          featured: false,

          published: true,

        }),

      });



      const data = await response.json();



      if (!response.ok) {

        setMessage(data.error || "Failed to add news.");

        return;

      }



      setMessage("News added successfully!");



      setHeading("");

      setSubHeading("");

      setCategory("");

      setImage("");

      setImageFile(null);

      setContent("");

    } catch (error) {

      console.error("Add news error:", error);

      setMessage("Something went wrong. Please try again.");

    } finally {

      setLoading(false);

    }

  };



  return (

    <main
      className="admin-page"
      style={{
        minHeight: "100vh",
        background: "#f5f6f8",
        padding: "40px 20px",
      }}
    >

      <div
        className="admin-card"
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "#ffffff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >

        {/* Header */}

        <div
          className="admin-page-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >

          <div>

            <h1

              style={{

                margin: 0,

                fontSize: "30px",

                color: "#122858",

              }}

            >

              Add News

            </h1>



            <p

              style={{

                marginTop: "8px",

                color: "#666",

              }}

            >

              Add a new article to Tech Gossip.

            </p>

          </div>



          <button

            type="button"

            onClick={() => router.push("/")}

            style={{

              padding: "10px 18px",

              border: "1px solid #ddd",

              background: "#fff",

              borderRadius: "6px",

              cursor: "pointer",

            }}

          >

            View Website

          </button>

        </div>



        <form onSubmit={handleSubmit}><div style={{ marginBottom: "22px" }}>

          <label>Heading</label>
          <input

            type="text"

            value={heading}

            onChange={(e) => setHeading(e.target.value)}

            placeholder="Enter news heading"

            required

            style={inputStyle}

          />

        </div>



          {/* Sub Heading */}

          <div style={{ marginBottom: "22px" }}>

            <label>Sub Heading</label>



            <textarea

              value={subHeading}

              onChange={(e) => setSubHeading(e.target.value)}

              placeholder="Enter sub heading"

              rows={3}

              style={inputStyle}

            />

          </div>



          {/* Category */}
          <div style={{ marginBottom: "26px" }}>
            {/* <label
              style={{
                fontWeight: "700",
                display: "block",
                color: "#172b4d",
                fontSize: "16px",
                marginBottom: "8px",
              }}
            >
              Category
            </label> */}

            <div
              style={{
                border: "1px solid #dce4ee",
                borderRadius: "16px",
                background: "linear-gradient(145deg, #ffffff 0%, #f7faff 100%)",
                padding: "20px",
                boxShadow: "0 8px 24px rgba(18, 40, 88, 0.06)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "12px",
                  marginBottom: "16px",
                }}
              >
                <div>
                  <div style={{ fontSize: "17px", fontWeight: 750, color: "#122858" }}>
                    Choose a category
                  </div>
                  <div style={{ fontSize: "13px", color: "#6b7890", marginTop: "4px" }}>
                    Select the section and then choose the best match for your article.
                  </div>
                </div>

                <div
                  style={{
                    padding: "7px 11px",
                    borderRadius: "999px",
                    background: category ? "#e5f7f5" : "#edf1f7",
                    color: category ? "#087f78" : "#64748b",
                    fontSize: "12px",
                    fontWeight: 700,
                    border: `1px solid ${category ? "#b9e9e3" : "#dce4ee"}`,
                  }}
                >
                  {category ? "CATEGORY SELECTED" : "NO CATEGORY SELECTED"}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  flexWrap: "wrap",
                  marginBottom: "16px",
                }}
              >
                {categoryGroups.map((group) => {
                  const isActive = activeCategoryGroup === group.name;
                  return (
                    <button
                      key={group.name}
                      type="button"
                      onClick={() => setActiveCategoryGroup(group.name)}
                      style={{
                        padding: "10px 15px",
                        borderRadius: "10px",
                        border: isActive ? "1px solid #122858" : "1px solid #dce4ee",
                        background: isActive ? "#122858" : "#ffffff",
                        color: isActive ? "#ffffff" : "#45546b",
                        fontSize: "13px",
                        fontWeight: 700,
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        boxShadow: isActive ? "0 4px 10px rgba(18, 40, 88, 0.16)" : "none",
                      }}
                    >
                      {group.shortName}
                      <span
                        style={{
                          marginLeft: "8px",
                          opacity: isActive ? 0.8 : 0.65,
                          fontSize: "11px",
                        }}
                      >
                        {group.categories.length}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div style={{ position: "relative", marginBottom: "16px" }}>
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "13px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#8290a5",
                    fontSize: "18px",
                  }}
                >
                  ⌕
                </span>
                <input
                  type="search"
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                  placeholder="Search all categories..."
                  aria-label="Search categories"
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    border: "1px solid #dce4ee",
                    borderRadius: "10px",
                    padding: "12px 14px 12px 40px",
                    fontSize: "14px",
                    outline: "none",
                    background: "#ffffff",
                    color: "#172b4d",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "8px",
                  marginBottom: "10px",
                  color: "#68768d",
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                <span>
                  {categorySearch.trim()
                    ? "Search results"
                    : categoryGroups.find((group) => group.name === activeCategoryGroup)?.name}
                </span>
                <span>
                  {categoryGroups
                    .flatMap((group) => group.categories)
                    .filter((item) => {
                      const matchesSearch = item.label
                        .toLowerCase()
                        .includes(categorySearch.trim().toLowerCase());
                      const matchesGroup =
                        categorySearch.trim() !== "" ||
                        categoryGroups
                          .find((group) => group.name === activeCategoryGroup)
                          ?.categories.some((activeItem) => activeItem.value === item.value);
                      return matchesSearch && matchesGroup;
                    }).length}{" "}
                  categories
                </span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 190px), 1fr))",
                  gap: "10px",
                  maxHeight: "360px",
                  overflowY: "auto",
                  padding: "2px 4px 4px 2px",
                }}
              >
                {categoryGroups
                  .flatMap((group) =>
                    group.categories.map((item) => ({
                      ...item,
                      groupName: group.name,
                      shortName: group.shortName,
                    }))
                  )
                  .filter((item) => {
                    const matchesSearch = item.label
                      .toLowerCase()
                      .includes(categorySearch.trim().toLowerCase());
                    const matchesGroup =
                      categorySearch.trim() !== "" || item.groupName === activeCategoryGroup;
                    return matchesSearch && matchesGroup;
                  })
                  .map((item) => {
                    const isSelected = category === item.value;
                    return (
                      <button
                        key={item.value}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => setCategory(item.value)}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "10px",
                          width: "100%",
                          minHeight: "64px",
                          textAlign: "left",
                          padding: "12px",
                          borderRadius: "11px",
                          border: isSelected ? "1.5px solid #078b85" : "1px solid #e0e7f0",
                          background: isSelected
                            ? "linear-gradient(135deg, #e7fbf8, #f4fffd)"
                            : "#ffffff",
                          color: "#243653",
                          cursor: "pointer",
                          transition: "all 0.18s ease",
                          boxShadow: isSelected ? "0 4px 12px rgba(7, 139, 133, 0.10)" : "none",
                        }}
                      >
                        <span
                          aria-hidden="true"
                          style={{
                            width: "19px",
                            height: "19px",
                            flex: "0 0 19px",
                            marginTop: "1px",
                            borderRadius: "6px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: isSelected ? "1px solid #078b85" : "1px solid #cbd5e1",
                            background: isSelected ? "#078b85" : "#ffffff",
                            color: "#ffffff",
                            fontSize: "12px",
                            fontWeight: 800,
                          }}
                        >
                          {isSelected ? "✓" : ""}
                        </span>
                        <span style={{ minWidth: 0 }}>
                          <span
                            style={{
                              display: "block",
                              fontSize: "13px",
                              lineHeight: 1.45,
                              fontWeight: isSelected ? 750 : 600,
                              overflowWrap: "anywhere",
                            }}
                          >
                            {item.label}
                          </span>
                          {categorySearch.trim() !== "" && (
                            <span
                              style={{
                                display: "block",
                                marginTop: "5px",
                                color: "#718096",
                                fontSize: "10px",
                              }}
                            >
                              {item.shortName}
                            </span>
                          )}
                        </span>
                      </button>
                    );
                  })}
              </div>

              {categorySearch.trim() !== "" &&
                categoryGroups
                  .flatMap((group) => group.categories)
                  .filter((item) =>
                    item.label.toLowerCase().includes(categorySearch.trim().toLowerCase())
                  ).length === 0 && (
                  <div
                    style={{
                      padding: "24px 12px",
                      textAlign: "center",
                      color: "#718096",
                      fontSize: "14px",
                    }}
                  >
                    No categories found. Try a different search.
                  </div>
                )}

              {category && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                    flexWrap: "wrap",
                    marginTop: "16px",
                    padding: "13px 14px",
                    borderRadius: "11px",
                    background: "#eefaf8",
                    border: "1px solid #c5eee8",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "10px",
                        fontWeight: 800,
                        letterSpacing: "0.08em",
                        color: "#087f78",
                        textTransform: "uppercase",
                        marginBottom: "4px",
                      }}
                    >
                      Selected category
                    </div>
                    <div style={{ color: "#143c47", fontSize: "14px", fontWeight: 750 }}>
                      {categoryGroups
                        .flatMap((group) => group.categories)
                        .find((item) => item.value === category)?.label || category}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCategory("")}
                    style={{
                      border: "1px solid #b9e9e3",
                      borderRadius: "8px",
                      padding: "7px 10px",
                      background: "#ffffff",
                      color: "#087f78",
                      fontSize: "12px",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    Clear selection
                  </button>
                </div>
              )}

            </div>

            <small
              style={{
                display: "block",
                marginTop: "8px",
                color: "#777",
              }}
            >
              Choose one category. Use search to find categories across all sections.
            </small>
          </div>

          {/* Image */}

          {/* Image Upload */}

          <div style={{ marginBottom: "22px" }}>

            <label

              style={{

                fontWeight: "600",

                display: "block",

                marginBottom: "8px",

              }}

            >

              News Image

            </label>



            <input

              type="file"

              accept="image/jpeg,image/png,image/webp,image/gif"

              onChange={(e) => {

                const selectedFile = e.target.files?.[0] || null;



                setImageFile(selectedFile);

                setImage("");

              }}

              style={{

                ...inputStyle,

                background: "#fff",

              }}

            />



            <small

              style={{

                display: "block",

                marginTop: "6px",

                color: "#777",

              }}

            >

              Choose an image from your computer. Maximum size: 5 MB.

            </small>



            {imagePreview && (

              <div style={{ marginTop: "15px" }}>

                <p style={{ marginBottom: "8px", fontWeight: "600" }}>

                  Image Preview

                </p>



                <img

                  src={imagePreview}

                  alt="Selected news image preview"

                  style={{

                    width: "100%",

                    maxWidth: "350px",

                    maxHeight: "220px",

                    objectFit: "cover",

                    borderRadius: "8px",

                    border: "1px solid #ddd",

                  }}

                />



                <button

                  type="button"

                  onClick={() => {

                    setImageFile(null);

                    setImage("");

                  }}

                  style={{

                    display: "block",

                    marginTop: "8px",

                    padding: "7px 12px",

                    border: "1px solid #ddd",

                    borderRadius: "5px",

                    background: "#fff",

                    cursor: "pointer",

                  }}

                >

                  Remove Image

                </button>

              </div>

            )}

          </div>



          {/* Content */}

          <div style={{ marginBottom: "22px" }}>

            <label>News Content</label>



            <textarea

              value={content}

              onChange={(e) => setContent(e.target.value)}

              placeholder="Write your news article..."

              rows={12}

              required

              style={inputStyle}

            />

          </div>



          {/* Automatic Date */}

          <div

            style={{

              marginBottom: "25px",

              padding: "12px 15px",

              background: "#f4f7fb",

              borderRadius: "6px",

              color: "#555",

            }}

          >

            📅 Date will be added automatically when the news is created.

          </div>



          {/* Message */}

          {message && (

            <div

              style={{

                marginBottom: "20px",

                padding: "12px",

                background: message.includes("success")

                  ? "#e8f7ed"

                  : "#ffeaea",

                color: message.includes("success")

                  ? "#187a3d"

                  : "#c62828",

                borderRadius: "6px",

              }}

            >

              {message}

            </div>

          )}



          {/* Submit */}

          <button

            type="submit"

            disabled={loading}

            style={{

              width: "100%",

              padding: "14px",

              border: "none",

              borderRadius: "6px",

              background: "#122858",

              color: "#fff",

              fontSize: "16px",

              cursor: loading ? "not-allowed" : "pointer",

            }}

          >

            {loading ? "Publishing..." : "Publish News"}

          </button>

        </form>

      </div>

    </main>

  );

}



const inputStyle = {

  width: "100%",

  marginTop: "8px",

  padding: "12px",

  border: "1px solid #ddd",

  borderRadius: "6px",

  fontSize: "15px",

  boxSizing: "border-box" as const,

};




