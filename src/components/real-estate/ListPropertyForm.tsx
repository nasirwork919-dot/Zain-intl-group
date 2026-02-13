import { useMemo, useState } from "react";
import {
  Building2,
  CheckCircle2,
  Home,
  Image as ImageIcon,
  MapPin,
  Phone,
  Send,
  User,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type PropertyType =
  | "apartment"
  | "villa"
  | "townhouse"
  | "penthouse"
  | "office"
  | "other";
type ListingType = "sale" | "rent";

function toWhatsAppText(lines: string[]) {
  return encodeURIComponent(lines.filter(Boolean).join("\n"));
}

function formatNumber(v: string) {
  const n = Number(String(v).replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(n) || n <= 0) return "";
  return n.toLocaleString();
}

export function ListPropertyForm({
  whatsappNumber = "+971521362224",
  onDone,
  className,
}: {
  whatsappNumber?: string;
  onDone?: () => void;
  className?: string;
}) {
  const [ownerName, setOwnerName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");

  const [listingType, setListingType] = useState<ListingType>("sale");
  const [propertyType, setPropertyType] = useState<PropertyType>("apartment");

  const [title, setTitle] = useState("");
  const [community, setCommunity] = useState("");
  const [building, setBuilding] = useState("");
  const [addressNotes, setAddressNotes] = useState("");

  const [price, setPrice] = useState("");
  const [beds, setBeds] = useState<string>("2");
  const [baths, setBaths] = useState<string>("2");
  const [areaSqft, setAreaSqft] = useState("");

  const [furnishing, setFurnishing] = useState<
    "furnished" | "unfurnished" | "partly"
  >("unfurnished");
  const [availability, setAvailability] = useState<
    "ready" | "vacant" | "tenanted" | "off-plan"
  >("ready");

  const [description, setDescription] = useState("");
  const [photoLinks, setPhotoLinks] = useState("");

  const canSubmit = useMemo(() => {
    const hasName = ownerName.trim().length >= 2;
    const hasContact = ownerPhone.trim().length >= 7 || ownerEmail.includes("@");
    const hasLocation = community.trim().length >= 2;
    const hasPrice = Number(String(price).replace(/[^0-9.]/g, "")) > 0;
    const hasTitle = title.trim().length >= 4;
    return hasName && hasContact && hasLocation && hasPrice && hasTitle;
  }, [community, ownerEmail, ownerName, ownerPhone, price, title]);

  const reset = () => {
    setOwnerName("");
    setOwnerPhone("");
    setOwnerEmail("");
    setListingType("sale");
    setPropertyType("apartment");
    setTitle("");
    setCommunity("");
    setBuilding("");
    setAddressNotes("");
    setPrice("");
    setBeds("2");
    setBaths("2");
    setAreaSqft("");
    setFurnishing("unfurnished");
    setAvailability("ready");
    setDescription("");
    setPhotoLinks("");
  };

  const submitToWhatsApp = () => {
    const wa = whatsappNumber.replace(/[^\d]/g, "");
    const priceFormatted = formatNumber(price);
    const areaFormatted = formatNumber(areaSqft);

    const lines: string[] = [
      "New Property Listing Request (Website)",
      "",
      "Owner details",
      `• Name: ${ownerName.trim()}`,
      ownerPhone.trim() ? `• Phone/WhatsApp: ${ownerPhone.trim()}` : "",
      ownerEmail.trim() ? `• Email: ${ownerEmail.trim()}` : "",
      "",
      "Listing details",
      `• Listing type: ${listingType.toUpperCase()}`,
      `• Property type: ${propertyType.toUpperCase()}`,
      `• Title: ${title.trim()}`,
      `• Community: ${community.trim()}`,
      building.trim() ? `• Building: ${building.trim()}` : "",
      addressNotes.trim() ? `• Address notes: ${addressNotes.trim()}` : "",
      `• Price (AED): ${priceFormatted || price.trim()}`,
      `• Beds: ${beds}`,
      `• Baths: ${baths}`,
      areaFormatted
        ? `• Area: ${areaFormatted} sqft`
        : areaSqft.trim()
          ? `• Area: ${areaSqft.trim()}`
          : "",
      `• Furnishing: ${furnishing.replace("-", " ").toUpperCase()}`,
      `• Availability: ${availability.replace("-", " ").toUpperCase()}`,
      "",
      description.trim() ? `Description:\n${description.trim()}` : "",
      "",
      photoLinks.trim()
        ? `Photos / links:\n${photoLinks
            .split("\n")
            .map((l) => l.trim())
            .filter(Boolean)
            .join("\n")}`
        : "",
    ];

    const text = toWhatsAppText(lines);
    const url = `https://wa.me/${wa}?text=${text}`;

    window.open(url, "_blank", "noopener,noreferrer");

    toast({
      title: "Sending to WhatsApp",
      description: "We opened WhatsApp with your property details pre-filled.",
    });

    reset();
    onDone?.();
  };

  return (
    <div className={cn("grid gap-4 md:grid-cols-5", className)}>
      {/* Left: form */}
      <div className="md:col-span-3">
        <Card
          className={cn(
            "rounded-[5px] border border-white/40 bg-white/80 p-5 shadow-[0_30px_100px_-75px_rgba(15,23,42,0.55)]",
            "ring-1 ring-black/10 backdrop-blur supports-[backdrop-filter]:bg-white/70",
          )}
        >
          <div className="text-left text-2xl font-extrabold tracking-tight">
            List your property
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            Fill in the details and we’ll send it directly to our WhatsApp team.
          </div>

          <Separator className="my-5" />

          <div className="grid gap-5">
            {/* Owner */}
            <div className="grid gap-3">
              <div className="inline-flex items-center gap-2 text-sm font-extrabold tracking-tight text-[hsl(var(--brand-ink))]">
                <User className="h-4 w-4" />
                Owner details
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="ownerName">Full name *</Label>
                  <Input
                    id="ownerName"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="Your full name"
                    className="h-11 rounded-[5px] border-white/60 bg-white/70 shadow-sm focus-visible:ring-[hsl(var(--brand))]/30"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="ownerPhone">Phone / WhatsApp *</Label>
                  <Input
                    id="ownerPhone"
                    value={ownerPhone}
                    onChange={(e) => setOwnerPhone(e.target.value)}
                    placeholder="+971 5X XXX XXXX"
                    className="h-11 rounded-[5px] border-white/60 bg-white/70 shadow-sm focus-visible:ring-[hsl(var(--brand))]/30"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="ownerEmail">Email (optional)</Label>
                <Input
                  id="ownerEmail"
                  value={ownerEmail}
                  onChange={(e) => setOwnerEmail(e.target.value)}
                  placeholder="name@email.com"
                  className="h-11 rounded-[5px] border-white/60 bg-white/70 shadow-sm focus-visible:ring-[hsl(var(--brand))]/30"
                />
              </div>

              <div className="text-xs font-semibold text-muted-foreground">
                Tip: provide either a valid phone/WhatsApp or email so we can
                confirm details quickly.
              </div>
            </div>

            {/* Listing basics */}
            <div className="grid gap-3">
              <div className="inline-flex items-center gap-2 text-sm font-extrabold tracking-tight text-[hsl(var(--brand-ink))]">
                <Building2 className="h-4 w-4" />
                Listing basics
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label>Listing type</Label>
                  <Select
                    value={listingType}
                    onValueChange={(v) => setListingType(v as ListingType)}
                  >
                    <SelectTrigger className="h-11 rounded-[5px] border-white/60 bg-white/70 shadow-sm focus:ring-[hsl(var(--brand))]/30">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="rounded-[5px]">
                      <SelectItem value="sale">For sale</SelectItem>
                      <SelectItem value="rent">For rent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label>Property type</Label>
                  <Select
                    value={propertyType}
                    onValueChange={(v) => setPropertyType(v as PropertyType)}
                  >
                    <SelectTrigger className="h-11 rounded-[5px] border-white/60 bg-white/70 shadow-sm focus:ring-[hsl(var(--brand))]/30">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="rounded-[5px]">
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="penthouse">Penthouse</SelectItem>
                      <SelectItem value="office">Office</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Marina View 2BR | High Floor | Vacant"
                  className="h-11 rounded-[5px] border-white/60 bg-white/70 shadow-sm focus-visible:ring-[hsl(var(--brand))]/30"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="community">Community / Area *</Label>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="community"
                      value={community}
                      onChange={(e) => setCommunity(e.target.value)}
                      placeholder="Dubai Marina"
                      className="h-11 rounded-[5px] border-white/60 bg-white/70 pl-9 shadow-sm focus-visible:ring-[hsl(var(--brand))]/30"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="building">Building (optional)</Label>
                  <Input
                    id="building"
                    value={building}
                    onChange={(e) => setBuilding(e.target.value)}
                    placeholder="e.g. Marina Gate"
                    className="h-11 rounded-[5px] border-white/60 bg-white/70 shadow-sm focus-visible:ring-[hsl(var(--brand))]/30"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="addressNotes">Address notes (optional)</Label>
                <Input
                  id="addressNotes"
                  value={addressNotes}
                  onChange={(e) => setAddressNotes(e.target.value)}
                  placeholder="Tower, floor, unit, nearby landmark..."
                  className="h-11 rounded-[5px] border-white/60 bg-white/70 shadow-sm focus-visible:ring-[hsl(var(--brand))]/30"
                />
              </div>
            </div>

            {/* Specs */}
            <div className="grid gap-3">
              <div className="inline-flex items-center gap-2 text-sm font-extrabold tracking-tight text-[hsl(var(--brand-ink))]">
                <Home className="h-4 w-4" />
                Specs
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="price">Price (AED) *</Label>
                  <Input
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. 2,650,000"
                    inputMode="numeric"
                    className="h-11 rounded-[5px] border-white/60 bg-white/70 shadow-sm focus-visible:ring-[hsl(var(--brand))]/30"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="area">Area (sqft) (optional)</Label>
                  <Input
                    id="area"
                    value={areaSqft}
                    onChange={(e) => setAreaSqft(e.target.value)}
                    placeholder="e.g. 1,410"
                    inputMode="numeric"
                    className="h-11 rounded-[5px] border-white/60 bg-white/70 shadow-sm focus-visible:ring-[hsl(var(--brand))]/30"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label>Beds</Label>
                  <Select value={beds} onValueChange={setBeds}>
                    <SelectTrigger className="h-11 rounded-[5px] border-white/60 bg-white/70 shadow-sm focus:ring-[hsl(var(--brand))]/30">
                      <SelectValue placeholder="Beds" />
                    </SelectTrigger>
                    <SelectContent className="rounded-[5px]">
                      {["studio", "1", "2", "3", "4", "5", "6+"].map((v) => (
                        <SelectItem key={v} value={v}>
                          {v === "studio" ? "Studio" : v}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label>Baths</Label>
                  <Select value={baths} onValueChange={setBaths}>
                    <SelectTrigger className="h-11 rounded-[5px] border-white/60 bg-white/70 shadow-sm focus:ring-[hsl(var(--brand))]/30">
                      <SelectValue placeholder="Baths" />
                    </SelectTrigger>
                    <SelectContent className="rounded-[5px]">
                      {["1", "2", "3", "4", "5+"].map((v) => (
                        <SelectItem key={v} value={v}>
                          {v}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label>Furnishing</Label>
                  <Select
                    value={furnishing}
                    onValueChange={(v) => setFurnishing(v as any)}
                  >
                    <SelectTrigger className="h-11 rounded-[5px] border-white/60 bg-white/70 shadow-sm focus:ring-[hsl(var(--brand))]/30">
                      <SelectValue placeholder="Furnishing" />
                    </SelectTrigger>
                    <SelectContent className="rounded-[5px]">
                      <SelectItem value="furnished">Furnished</SelectItem>
                      <SelectItem value="partly">Partly furnished</SelectItem>
                      <SelectItem value="unfurnished">Unfurnished</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label>Availability</Label>
                  <Select
                    value={availability}
                    onValueChange={(v) => setAvailability(v as any)}
                  >
                    <SelectTrigger className="h-11 rounded-[5px] border-white/60 bg-white/70 shadow-sm focus:ring-[hsl(var(--brand))]/30">
                      <SelectValue placeholder="Availability" />
                    </SelectTrigger>
                    <SelectContent className="rounded-[5px]">
                      <SelectItem value="ready">Ready</SelectItem>
                      <SelectItem value="vacant">Vacant</SelectItem>
                      <SelectItem value="tenanted">Tenanted</SelectItem>
                      <SelectItem value="off-plan">Off-plan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Description + photos */}
            <div className="grid gap-3">
              <div className="inline-flex items-center gap-2 text-sm font-extrabold tracking-tight text-[hsl(var(--brand-ink))]">
                <ImageIcon className="h-4 w-4" />
                Description & photos
              </div>

              <div className="grid gap-2">
                <Label htmlFor="desc">Description (optional)</Label>
                <Textarea
                  id="desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell us the key selling points, view, layout, upgrades..."
                  className="min-h-[110px] rounded-[5px] border-white/60 bg-white/70 shadow-sm focus-visible:ring-[hsl(var(--brand))]/30"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="photos">Photo links (optional)</Label>
                <Textarea
                  id="photos"
                  value={photoLinks}
                  onChange={(e) => setPhotoLinks(e.target.value)}
                  placeholder={
                    "Paste links (one per line)\nDrive/Dropbox/WeTransfer/Instagram post, etc."
                  }
                  className="min-h-[90px] rounded-[5px] border-white/60 bg-white/70 shadow-sm focus-visible:ring-[hsl(var(--brand))]/30"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="grid gap-3 sm:flex sm:items-center sm:justify-between">
              <div className="text-xs font-semibold text-muted-foreground">
                Fields marked * are required.
              </div>

              <div className="grid grid-cols-1 gap-2 sm:flex sm:gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 rounded-[5px]"
                  onClick={reset}
                >
                  Reset
                </Button>

                <Button
                  type="button"
                  disabled={!canSubmit}
                  onClick={submitToWhatsApp}
                  className={cn(
                    "h-11 rounded-[5px] bg-[hsl(var(--brand-ink))] text-white hover:bg-[hsl(var(--brand-ink))]/92",
                    "disabled:opacity-50",
                  )}
                >
                  Send to WhatsApp
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Right: summary panel */}
      <div className="md:col-span-2">
        <Card
          className={cn(
            "rounded-[5px] border border-white/40 bg-white/65 p-5 shadow-[0_25px_80px_-65px_rgba(15,23,42,0.55)]",
            "ring-1 ring-black/10 backdrop-blur supports-[backdrop-filter]:bg-white/55",
          )}
        >
          <div className="inline-flex items-center gap-2 text-sm font-extrabold tracking-tight text-[hsl(var(--brand-ink))]">
            <CheckCircle2 className="h-4 w-4" />
            What happens next
          </div>
          <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
            <li className="leading-relaxed">
              Your details will be sent to our WhatsApp team.
            </li>
            <li className="leading-relaxed">
              We’ll confirm missing info (photos, exact address, etc.).
            </li>
            <li className="leading-relaxed">
              We’ll publish your listing and share the link back to you.
            </li>
          </ul>

          <Separator className="my-4" />

          <div className="grid gap-3 text-sm">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-[5px] bg-[hsl(var(--brand))]/10 text-[hsl(var(--brand-ink))] ring-1 ring-black/5">
                <Phone className="h-4 w-4" />
              </span>
              <div>
                <div className="font-semibold text-foreground">WhatsApp</div>
                <div className="text-muted-foreground">+971 52 136 2224</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-[5px] bg-[hsl(var(--brand-2))]/12 text-[hsl(var(--brand-ink))] ring-1 ring-black/5">
                <MapPin className="h-4 w-4" />
              </span>
              <div>
                <div className="font-semibold text-foreground">Response time</div>
                <div className="text-muted-foreground">
                  Typically within minutes
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            <User className="h-4 w-4" />
            Your details are only used to process the listing request.
          </div>
        </Card>
      </div>
    </div>
  );
}