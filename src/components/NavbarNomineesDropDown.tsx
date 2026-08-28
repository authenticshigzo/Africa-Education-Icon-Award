import { Link } from "react-router-dom";

type DropdownProps = { isOpen: boolean; onMouseEnter: () => void; isMobile?: boolean }

function NavbarNomineesDropDown({ isOpen, onMouseEnter, isMobile = false }: DropdownProps) {
  const blocker = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    alert("This link is currently blocked.");
  }

  return (
    <>
      <div onMouseEnter={onMouseEnter} className={`${isOpen ? "flex" : "hidden"} ${isMobile ? "relative" : "fixed left-[210px] top-[129px]"} before:content-[''] before:absolute before:left-0 before:right-0 before:-top-3 before:h-3 bg-[#0F0E0C] text-white text-base font-semibold whitespace-nowrap py-2 px-2 flex-col items-left justify-center gap-2 z-10`}>
        <Link to="/about" className="px-3 py-2 cursor-pointer hover:bg-[#3B301C]" onClick={blocker}>Africa&#39;s Education Impact Directory</Link>
        <Link to="/about" className="px-3 py-2 cursor-pointer hover:bg-[#3B301C]" onClick={blocker}>Browse by Category</Link>
        <Link to="/about" className="px-3 py-2 cursor-pointer hover:bg-[#3B301C]" onClick={blocker}>Browse by Region (8 Africa &#43; 7 Global)</Link>
        <Link to="/about" className="px-3 py-2 cursor-pointer hover:bg-[#3B301C]" onClick={blocker}>Verified Enablers</Link>
        <Link to="/about" className="px-3 py-2 cursor-pointer hover:bg-[#3B301C]" onClick={blocker}>Claim or Update a Profile</Link>
      </div>
    </>
  );
}

export default NavbarNomineesDropDown