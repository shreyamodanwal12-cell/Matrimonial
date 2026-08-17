function SearchBox() {
  return (
    <section className="relative z-20 -mt-12 px-4">
      <div className="mx-auto max-w-[1050px]">

        <div className="rounded-xl border border-[#ead8bd] bg-[#fffaf2] p-4 shadow-[0_8px_30px_rgba(73,38,20,0.15)] sm:p-5">

          <div className="mb-4">
            <h2 className="font-serif text-[22px] font-semibold text-[#751b17]">
              Find Your Match
            </h2>

            <p className="mt-1 text-[11px] text-[#806653]">
              Search profiles based on your preferences
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">

            {/* Looking For */}
            <div>
              <label className="mb-1.5 block text-[11px] font-medium text-[#563927]">
                Looking For
              </label>

              <select
                className="
                  h-10
                  w-full
                  rounded-md
                  border
                  border-[#dec9a8]
                  bg-white
                  px-3
                  text-xs
                  text-[#563927]
                  outline-none
                  transition
                  focus:border-[#9b261f]
                  focus:ring-2
                  focus:ring-[#9b261f]/10
                "
              >
                <option>Bride</option>
                <option>Groom</option>
              </select>
            </div>

            {/* Age */}
            <div>
              <label className="mb-1.5 block text-[11px] font-medium text-[#563927]">
                Age
              </label>

              <select
                className="
                  h-10
                  w-full
                  rounded-md
                  border
                  border-[#dec9a8]
                  bg-white
                  px-3
                  text-xs
                  text-[#563927]
                  outline-none
                  transition
                  focus:border-[#9b261f]
                  focus:ring-2
                  focus:ring-[#9b261f]/10
                "
              >
                <option>18 - 25</option>
                <option>25 - 30</option>
                <option>30 - 35</option>
                <option>35 - 40</option>
                <option>40+</option>
              </select>
            </div>

            {/* Religion */}
            <div>
              <label className="mb-1.5 block text-[11px] font-medium text-[#563927]">
                Religion
              </label>

              <select
                className="
                  h-10
                  w-full
                  rounded-md
                  border
                  border-[#dec9a8]
                  bg-white
                  px-3
                  text-xs
                  text-[#563927]
                  outline-none
                  transition
                  focus:border-[#9b261f]
                  focus:ring-2
                  focus:ring-[#9b261f]/10
                "
              >
                <option>All Religions</option>
                <option>Hindu</option>
                <option>Muslim</option>
                <option>Christian</option>
                <option>Sikh</option>
                <option>Jain</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="mb-1.5 block text-[11px] font-medium text-[#563927]">
                Location
              </label>

              <select
                className="
                  h-10
                  w-full
                  rounded-md
                  border
                  border-[#dec9a8]
                  bg-white
                  px-3
                  text-xs
                  text-[#563927]
                  outline-none
                  transition
                  focus:border-[#9b261f]
                  focus:ring-2
                  focus:ring-[#9b261f]/10
                "
              >
                <option>All Locations</option>
                <option>Gulbarga</option>
                <option>Bangalore</option>
                <option>Hyderabad</option>
                <option>Mumbai</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">

              <button
                type="button"
                className="
                  flex
                  h-10
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-md
                  bg-[#8c1d18]
                  px-5
                  text-xs
                  font-semibold
                  text-white
                  transition
                  hover:bg-[#751712]
                  active:scale-[0.98]
                "
              >
                <span>⌕</span>
                Search
              </button>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default SearchBox;