import { Link } from "react-router-dom";

type DropdownProps = { isOpen: boolean; onMouseEnter: () => void; isMobile?: boolean }

function NavbarEducationImpactDropDown({ isOpen, onMouseEnter, isMobile = false }: DropdownProps) {
  const blocker = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    alert("This link is currently blocked.");
  }

  return (
    <>
      <div onMouseEnter={onMouseEnter} className={`${isOpen ? "flex" : "hidden"} ${isMobile ? "relative" : "fixed left-[210px] top-[129px]"} before:content-[''] before:absolute before:left-0 before:right-0 before:-top-3 before:h-3 bg-[#0F0E0C] text-white text-base font-semibold whitespace-nowrap py-2 px-2 flex-col items-left justify-center gap-2 z-10`}>
        <Link to="/about" className="px-3 py-2 cursor-pointer hover:bg-[#3B301C]" onClick={blocker}>Education Social Impact Overview</Link>
        <Link to="/about" className="px-3 py-2 cursor-pointer hover:bg-[#3B301C]" onClick={blocker}>Rebuild My School Africa</Link>
        <Link to="/about" className="px-3 py-2 cursor-pointer hover:bg-[#3B301C]" onClick={blocker}>Support a Special-Needs School</Link>
        <Link to="/about" className="px-3 py-2 cursor-pointer hover:bg-[#3B301C]" onClick={blocker}>Regional School Interventions</Link>
        <Link to="/about" className="px-3 py-2 cursor-pointer hover:bg-[#3B301C]" onClick={blocker}>Afri-EduTourism 2027</Link>
        <Link to="/about" className="px-3 py-2 cursor-pointer hover:bg-[#3B301C]" onClick={blocker}>EduAid-Africa Journal</Link>
        <Link to="/about" className="px-3 py-2 cursor-pointer hover:bg-[#3B301C]" onClick={blocker}>Impact Stories & Media</Link>
        <Link to="/about" className="px-3 py-2 cursor-pointer hover:bg-[#3B301C]" onClick={blocker}>Gala 2026&#46;13 December 2026</Link>
      </div>
    </>
  );
}

export default NavbarEducationImpactDropDown