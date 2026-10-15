// Edit topics and questions here
const SUBJECTS = {
  rs: { name: "Religious Studies (AQA)", icon: "🕊️", topics: ["Philosophy of religion: arguments for God", "Evil and suffering", "Religious experience", "Miracles", "Ethics: natural law", "Ethics: situation ethics", "Kant and virtue ethics", "Euthanasia and business ethics"] },
  econ: { name: "Economics (Edexcel A)", icon: "📈", topics: ["Competitive markets", "Elasticity", "Market failure", "Government intervention", "Business growth and objectives", "Market structures", "Labour markets", "Macro: AD/AS and growth", "Inflation and unemployment", "Fiscal and monetary policy"] },
  media: { name: "Media Studies", icon: "🎬", topics: ["Media language", "Representation", "Media industries", "Media audiences", "Close study products", "Theoretical perspectives"] }
};
// Add questions here: { s: subject id, q: question, a: [4 options], c: index of correct option }
const QUESTIONS = [
  { s: "rs", q: "Which argument claims God's existence follows from the idea of a being than which nothing greater can be conceived?", a: ["Cosmological", "Ontological", "Teleological", "Moral"], c: 1 },
  { s: "rs", q: "Who developed Situation Ethics?", a: ["Joseph Fletcher", "Aquinas", "Kant", "Mill"], c: 0 },
  { s: "econ", q: "If PED is greater than 1, demand is…", a: ["Inelastic", "Unitary", "Elastic", "Perfectly inelastic"], c: 2 },
  { s: "econ", q: "A positive externality of consumption means…", a: ["Social benefit > private benefit", "Private cost > social cost", "Prices are too high", "Supply is fixed"], c: 0 },
  { s: "media", q: "Whose theory describes binary oppositions in narrative?", a: ["Propp", "Todorov", "Lévi-Strauss", "Hall"], c: 2 },
  { s: "media", q: "Whose theory suggests audiences decode messages in dominant, negotiated or oppositional ways?", a: ["Gerbner", "Stuart Hall", "Bandura", "Mulvey"], c: 1 }
];
