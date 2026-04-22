import React, { useState } from 'react';
import {
    User,
    Mail,
    Phone,
    Calendar,
    BookOpen,
    Briefcase,
    Plus,
    Users

} from 'lucide-react';
import ListCard from '../CandidateComponents/ListCard';
import InputField from '../CandidateComponents/InputField';
import CriminalCase from '../CandidateComponents/criminalCase';
import { UsecandidateProfile } from '../../../hooks/candidate/UsecandidateProfile';

const CandidateProfile = () => {
    const [profilePhoto, setProfilePhoto] = useState(
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
    );

    const [profileData, setProfileData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dob: "",
        party: "",
    });

    const [educationList, setEducationList] = useState([
        {
            id: 1,
            degree: "Master of Public Administration (MPA)",
            institute: "National University of Public Affairs",
            duration: "2010 - 2012",
        },
    ]);
    const [experienceList, setExperienceList] = useState([
        {
            id: 1,
            role: "Senior Policy Analyst",
            organization: "Civic Advocacy Foundation",
            duration: "2012 - Present",
        },
    ]);
    const [assets, setAssets] = useState("");

    const [assetBreakdown, setAssetBreakdown] = useState({
        movable: "₹0",
        immovable: "₹0",
        other: "₹0",
    });
    // const [affidavits, setAffidavits] = useState([
    //     {
    //         id: 1,
    //         name: "Declaration of Assets",
    //         file: null,
    //     },
    //     {
    //         id: 3,
    //         name: "Statement of Intent",
    //         file: null,
    //     },
    // ]);

    const parseAmount = (v) =>
        Number(v.replace(/[₹,]/g, "")) || 0;

    const totalAssets =
        parseAmount(assetBreakdown.movable) +
        parseAmount(assetBreakdown.immovable) +
        parseAmount(assetBreakdown.other);


    const [hasCriminalCase, setHasCriminalCase] = useState(false);
    const [criminalCases, setCriminalCases] = useState([]);

    const handleCriminalCaseToggle = (e) => {
        const checked = e.target.checked;
        setHasCriminalCase(checked);

        if (!checked) {
            setCriminalCases([]); // clear cases if unchecked
        }
    };

    const { profile } = UsecandidateProfile()


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            setProfilePhoto(reader.result); // ✅ base64 string
        };
        reader.readAsDataURL(file);
    };



    const handlePdfChange = (e, index) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            setCriminalCases((prev) =>
                prev.map((c, i) =>
                    i === index ? { ...c, file: reader.result } : c
                )
            );
        };
        reader.readAsDataURL(file);
    };


    const handleSave = async () => {


        const payload = {
            ...profileData,
            profilePhoto,
            assets,
            assetBreakdown,
            education: educationList.map(({ degree, institute, duration }) => ({
                degree,
                institute,
                duration,
            })),
            experience: experienceList.map(({ role, organization, duration }) => ({
                role,
                organization,
                duration,
            })),
            criminalCases,
        };
        console.log("criminalCases payload:", criminalCases);
        await profile.mutateAsync(payload);
    };


    return (
        <div className="min-h-screen ">
            <div className="max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-zinc-900">Candidate Profile</h1>
                    <p className="text-sm text-zinc-500">
                        Manage your personal, professional, and educational details. All self-declared information is pending verification.
                    </p>
                </div>

                {/* Profile Photo & Basic Info */}
                <section className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-zinc-900">Profile Photo & Basic Info</h2>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-100">
                            Self-declared (pending verification)
                        </span>
                    </div>

                    <div className="flex flex-col items-center mb-8">
                        <div className="relative group">
                            <div className="w-24 h-24 rounded-full overflow-hidden bg-zinc-100 border-4 border-white shadow-md">
                                {profilePhoto ? (
                                    <img
                                        src={profilePhoto}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className='flex items-center justify-center w-full h-full'>
                                        <User size={28} />
                                    </div>

                                )}
                            </div>
                        </div>
                        <div className="flex gap-3 mt-4">
                            <label className="text-sm font-bold text-blue-600 hover:text-blue-700 cursor-pointer">
                                Upload New Photo
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={handleImageChange}

                                />
                            </label>
                            <button className="text-sm font-bold text-zinc-400 hover:text-zinc-600"
                                onClick={() => setProfilePhoto("")}
                            >
                                Remove Photo
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                            label="First Name"
                            icon={<User size={16} />}
                            value={profileData.firstName}
                            onChange={(e) =>
                                setProfileData({ ...profileData, firstName: e.target.value })
                            }
                        />

                        <InputField
                            label="Last Name"
                            icon={<User size={16} />}
                            value={profileData.lastName}
                            onChange={(e) =>
                                setProfileData({ ...profileData, lastName: e.target.value })
                            }
                        />

                        <InputField
                            label="Email Address"
                            icon={<Mail size={16} />}
                            value={profileData.email}
                            onChange={(e) =>
                                setProfileData({ ...profileData, email: e.target.value })
                            }
                        />

                        <InputField
                            label="Phone Number"
                            icon={<Phone size={16} />}
                            value={profileData.phone}
                            onChange={(e) =>
                                setProfileData({ ...profileData, phone: e.target.value })
                            }
                        />

                        <InputField
                            label="Date of Birth"
                            type="date"
                            icon={<Calendar size={16} />}
                            value={profileData.dob}
                            onChange={(e) =>
                                setProfileData({ ...profileData, dob: e.target.value })
                            }
                        />
                        <InputField
                            label="Party Name"
                            type="text"
                            icon={<Users size={16} />}
                            value={profileData.party}
                            onChange={(e) =>
                                setProfileData({ ...profileData, party: e.target.value })
                            }
                        />
                    </div>

                </section>

                {/* Bio & Vision Statement */}
                <section className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-zinc-900">Bio & Vision Statement</h2>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-500 uppercase">Your Biography</label>
                        <textarea
                            className="w-full h-32 p-4 text-sm bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all resize-none text-zinc-600"
                            placeholder="As a dedicated community leader for over a decade..."
                        />
                    </div>
                </section>

                {/* Educational Background */}
                <section className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6">
                    <h2 className="text-lg font-bold text-zinc-900 mb-4">
                        Educational Background
                    </h2>

                    <div className="space-y-4">
                        {educationList.map((edu) => (
                            <ListCard
                                key={edu.id}
                                title={edu.degree}
                                subtitle={edu.institute}
                                date={edu.duration}
                                icon={<BookOpen size={18} className="text-blue-600" />}
                                onUpdate={(updated) =>
                                    setEducationList(
                                        educationList.map((e) =>
                                            e.id === edu.id
                                                ? {
                                                    ...e,
                                                    degree: updated.title,
                                                    institute: updated.subtitle,
                                                    duration: updated.date,
                                                }
                                                : e
                                        )
                                    )
                                }
                                onDelete={() =>
                                    setEducationList(educationList.filter((e) => e.id !== edu.id))
                                }
                            />
                        ))}


                        <button
                            onClick={() =>
                                setEducationList([
                                    ...educationList,
                                    {
                                        id: Date.now(),
                                        degree: "New Degree",
                                        institute: "Institute Name",
                                        duration: "Year - Year",
                                    },
                                ])
                            }
                            className="w-full py-3 flex items-center justify-center gap-2 text-sm font-bold text-blue-600 border-2 border-dashed border-blue-100 rounded-xl hover:bg-blue-50 transition-colors"
                        >
                            <Plus size={16} /> Add Education
                        </button>
                    </div>
                </section>

                {/* Professional Experience */}
                <section className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6">
                    <h2 className="text-lg font-bold text-zinc-900 mb-4">
                        Professional Experience
                    </h2>

                    <div className="space-y-4">
                        {experienceList.map((exp) => (
                            <ListCard
                                key={exp.id}
                                title={exp.role}
                                subtitle={exp.organization}
                                date={exp.duration}
                                icon={<Briefcase size={18} className="text-blue-600" />}
                                onUpdate={(updated) =>
                                    setExperienceList(
                                        experienceList.map((e) =>
                                            e.id === exp.id
                                                ? {
                                                    ...e,
                                                    role: updated.title,
                                                    organization: updated.subtitle,
                                                    duration: updated.date,
                                                }
                                                : e
                                        )
                                    )
                                }
                                onDelete={() =>
                                    setExperienceList(
                                        experienceList.filter((e) => e.id !== exp.id)
                                    )
                                }
                            />
                        ))}

                        <button
                            onClick={() =>
                                setExperienceList([
                                    ...experienceList,
                                    {
                                        id: Date.now(),
                                        role: "New Role",
                                        organization: "Organization Name",
                                        duration: "Year - Year",
                                    },
                                ])
                            }
                            className="w-full py-3 flex items-center justify-center gap-2 text-sm font-bold text-blue-600 border-2 border-dashed border-blue-100 rounded-xl hover:bg-blue-50 transition-colors"
                        >
                            <Plus size={16} /> Add Experience
                        </button>
                    </div>
                </section>



                {/* Affidavit Uploads */}
                {/* <section className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6">
                    <h2 className="text-lg font-bold text-zinc-900 mb-2">Affidavit Uploads</h2>
                    <p className="text-xs text-zinc-500 mb-6">Upload required legal documents for your candidacy.</p>
                    <div className="space-y-3">
                        {affidavits.map((doc) => (
                            <FileUploadRow
                                key={doc.id}
                                label={doc.name}
                                file={doc.file}
                                onUpload={(file) =>
                                    setAffidavits(
                                        affidavits.map((a) =>
                                            a.id === doc.id ? { ...a, file } : a
                                        )
                                    )
                                }
                            />
                        ))}

                    </div>
                </section> */}

                <section className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6">
                    <h2 className="text-lg font-bold mb-4">Assets Declaration</h2>

                    <InputField
                        label="Total Assets"
                        value={`₹${totalAssets.toLocaleString("en-IN")}`}
                        disabled
                    />

                    <InputField
                        label="Movable Assets"
                        value={assetBreakdown.movable}
                        onChange={(e) =>
                            setAssetBreakdown({ ...assetBreakdown, movable: e.target.value })
                        }
                    />

                    <InputField
                        label="Immovable Assets"
                        value={assetBreakdown.immovable}
                        onChange={(e) =>
                            setAssetBreakdown({ ...assetBreakdown, immovable: e.target.value })
                        }
                    />

                    <InputField
                        label="Other Assets"
                        value={assetBreakdown.other}
                        onChange={(e) =>
                            setAssetBreakdown({ ...assetBreakdown, other: e.target.value })
                        }
                    />
                </section>

                <section className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6">
                    <h2 className="text-lg font-bold text-zinc-900 mb-2">
                        Criminal Case Declaration
                    </h2>
                    <p className="text-xs text-zinc-500 mb-6">
                        Upload required legal documents for your candidacy.
                    </p>

                    {/* Toggle */}
                    <div className="flex items-center gap-2 mb-6 ">
                        <input
                            type="checkbox"
                            id="hasCriminalCase"
                            checked={hasCriminalCase}
                            onChange={handleCriminalCaseToggle}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 cursor-pointer"
                        />
                        <label htmlFor="hasCriminalCase" className="text-sm text-zinc-700 cursor-pointer">
                            I have criminal cases
                        </label>
                    </div>

                    {hasCriminalCase && (
                        <CriminalCase
                            criminalCases={criminalCases}
                            setCriminalCases={setCriminalCases}
                            handlePdfChange={handlePdfChange}
                        />
                    )}
                </section>


                {/* Save Button */}
                <div className="w-full pt-4 pb-12">
                    <button
                        type="button"
                        disabled={profile.isPending}
                        onClick={handleSave}
                        className={`w-full font-bold py-3 px-10 rounded-xl shadow-lg transition-all active:scale-95
                                ${profile.isPending
                                ? "bg-gray-400 cursor-not-allowed shadow-none"
                                : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200"
                            }
                                `}
                    >
                        {profile.isPending ? "Saving..." : "Save Profile"}
                    </button>
                </div>

            </div>
        </div>
    );
};



export default CandidateProfile;