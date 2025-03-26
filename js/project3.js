let lang = "en";
const browserLang = navigator.language || navigator.userLanguage;
if (browserLang.startsWith("tr")) {
  lang = "tr";
}
document.addEventListener("DOMContentLoaded", () => {
  fetch('/data/project3.json')
    .then(response => response.json())
    .then(data => {
      const container = document.querySelector(".project-details-text");
      if (!container) return;

      // Title
      const title = document.createElement("h2");
      title.textContent = data[`title_${lang}`];
      container.appendChild(title);

      // Purpose / Introduction
      const intro = document.createElement("p");
      intro.textContent = data[`introduction_${lang}`];
      container.appendChild(intro);

      // Phase 1
      const p1Title = document.createElement("h3");
      p1Title.textContent = data[`phase_1_title_${lang}`];
      container.appendChild(p1Title);

      const p1Desc = document.createElement("p");
      p1Desc.textContent = data[`phase_1_description_${lang}`];
      container.appendChild(p1Desc);

      const targetList = document.createElement("ul");
      data[`target_audience_${lang}`].forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = item;
        targetList.appendChild(li);
      });
      container.appendChild(targetList);

      // Phase 2
      const p2Title = document.createElement("h3");
      p2Title.textContent = data[`phase_2_title_${lang}`];
      container.appendChild(p2Title);

      const p2Desc = document.createElement("p");
      p2Desc.textContent = data[`phase_2_description_${lang}`];
      container.appendChild(p2Desc);

      const example = document.createElement("blockquote");
      example.textContent = data[`example_${lang}`];
      container.appendChild(example);

      const aiList = document.createElement("ul");
      data[`ai_capabilities_${lang}`].forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        aiList.appendChild(li);
      });
      container.appendChild(aiList);

      // Final Stage
      const finalStage = document.createElement("h3");
      finalStage.textContent = data[`final_stage_${lang}`];
      container.appendChild(finalStage);

      const finalDesc = document.createElement("p");
      finalDesc.textContent = data[`final_stage_description_${lang}`];
      container.appendChild(finalDesc);

      // Future Potential
      const future = document.createElement("h3");
      future.textContent = "Future Potential";
      container.appendChild(future);

      const futureDesc = document.createElement("p");
      futureDesc.textContent = data[`future_potential_${lang}`];
      container.appendChild(futureDesc);

      // Business Model
      const business = document.createElement("h3");
      business.textContent = "Business Model";
      container.appendChild(business);

      const businessDesc = document.createElement("p");
      businessDesc.textContent = data[`business_model_${lang}`];
      container.appendChild(businessDesc);

      // Conclusion
      const conclusion = document.createElement("h3");
      conclusion.textContent = "Conclusion";
      container.appendChild(conclusion);

      const conclusionText = document.createElement("p");
      conclusionText.textContent = data[`conclusion_${lang}`];
      container.appendChild(conclusionText);
    })
    .catch(err => {
      console.error("Failed to load project3.json:", err);
    });
});
