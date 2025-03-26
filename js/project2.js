

document.addEventListener("DOMContentLoaded", () => {
  fetch('../data/project2.json')
    .then(response => response.json())
    .then(data => {
      const container = document.querySelector(".project-details-text");
      if (!container) return;

      // Title
      const title = document.createElement("h2");
      title.textContent = data.title_en;
      container.appendChild(title);

      // Purpose
      const purpose = document.createElement("p");
      purpose.textContent = data.purpose_en;
      container.appendChild(purpose);

      // System Overview
      const sysTitle = document.createElement("h3");
      sysTitle.textContent = "1. System Overview";
      container.appendChild(sysTitle);

      const hardware = document.createElement("ul");
      data.system_overview_en.hardware_components.forEach(item => {
        const li = document.createElement("li");
        li.textContent = "Hardware: " + item;
        hardware.appendChild(li);
      });
      container.appendChild(hardware);

      const software = document.createElement("ul");
      data.system_overview_en.software_components.forEach(item => {
        const li = document.createElement("li");
        li.textContent = "Software: " + item;
        software.appendChild(li);
      });
      container.appendChild(software);

      const bluetooth = document.createElement("ul");
      data.system_overview_en.bluetooth_audio_communication.forEach(item => {
        const li = document.createElement("li");
        li.textContent = "Bluetooth: " + item;
        bluetooth.appendChild(li);
      });
      container.appendChild(bluetooth);

      // Key Features Table
      const featuresTitle = document.createElement("h3");
      featuresTitle.textContent = "2. Key Features";
      container.appendChild(featuresTitle);

      const table = document.createElement("table");
      const headerRow = document.createElement("tr");
      ["Feature", "Description"].forEach(text => {
        const th = document.createElement("th");
        th.textContent = text;
        headerRow.appendChild(th);
      });
      table.appendChild(headerRow);

      data.key_features_table_en.forEach(row => {
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        td1.textContent = row.feature;
        const td2 = document.createElement("td");
        td2.textContent = row.description;
        tr.appendChild(td1);
        tr.appendChild(td2);
        table.appendChild(tr);
      });
      container.appendChild(table);

      // Example Use Case
      const exampleTitle = document.createElement("h3");
      exampleTitle.textContent = "3. Example Use Case";
      container.appendChild(exampleTitle);

      const example = document.createElement("p");
      example.textContent = data.example_use_case_en;
      container.appendChild(example);

      // Development Plan
      const devTitle = document.createElement("h3");
      devTitle.textContent = "4. Development Plan (Phases)";
      container.appendChild(devTitle);

      const devList = document.createElement("ol");
      data.development_plan_en.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        devList.appendChild(li);
      });
      container.appendChild(devList);

      // Future Upgrades
      const futureTitle = document.createElement("h3");
      futureTitle.textContent = "5. Future Upgrades";
      container.appendChild(futureTitle);

      const futureList = document.createElement("ul");
      data.future_upgrades_en.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        futureList.appendChild(li);
      });
      container.appendChild(futureList);
    })
    .catch(err => {
      console.error("Failed to load project2.json:", err);
    });
});