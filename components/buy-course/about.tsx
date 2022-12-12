export default function About() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-gilroy text-[25px] font-extrabold text-text1">
        About
      </h2>

      <p className="leading-[140%] font-medium font-urbanist">
        There was a lot that happened this week! First, Marques and Andrew
        discuss the madness that has been going on with Twitter and Elon Musk.
        Then they talk about the Metaverse before reminiscing about smartphone
        features that they miss. Lastly, we wrap up with some trivia!
      </p>

      {/* Skills you'll gain */}
      <div className="flex flex-col gap-3">
        <h3 className="font-urbanist font-semibold text-[20px]">
          🧰 Skills {"you'll"} gain
        </h3>

        <div className="flex gap-3">
          <span className="h-[32px] bg-background3 px-[10px] rounded-xl flex items-center justify-center">
            Psychology
          </span>
          <span className="h-[32px] bg-background3 px-[10px] rounded-xl flex items-center justify-center">
            World War
          </span>
          <span className="h-[32px] bg-background3 px-[10px] rounded-xl flex items-center justify-center">
            Cinematography
          </span>
          <span className="h-[32px] bg-background3 px-[10px] rounded-xl flex items-center justify-center">
            Copywriting
          </span>
        </div>
      </div>
    </section>
  );
}
