let indiaMap = () =>{
    am5.ready(function () {

    var root = am5.Root.new("chartdiv");
    root.setThemes([am5themes_Animated.new(root)]);

    var chart = root.container.children.push(
        am5map.MapChart.new(root, {
        projection: am5map.geoMercator(),
        panX: "none",
        panY: "none",
        wheelY: "none"
        })
    );

    var polygonSeries = chart.series.push(
        am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_indiaLow
        })
    );

    polygonSeries.mapPolygons.template.setAll({
        tooltipText: "{name}",
        interactive: true,
        fill: am5.color(0xe0e0e0),
        stroke: am5.color(0x555555)
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
        fill: am5.color(0xffcc00)
    });

    polygonSeries.mapPolygons.template.states.create("active", {
        fill: am5.color(0xd32f2f)
    });

    polygonSeries.mapPolygons.template.events.on("click", function (ev) {
        polygonSeries.mapPolygons.each(p => p.set("active", false));
        ev.target.set("active", true);
        // alert("Selected State: " + ev.target.dataItem.dataContext.name);
    });

    });
}

let distributorMethod = () =>{
    document.getElementById("applyNowBtn").addEventListener("click", () =>{
        document.getElementById("dealerForm").scrollIntoView({
            behavior: "smooth"
        });
    });

    document.getElementById("ourNetworkBtn").addEventListener("click", () =>{
        document.getElementById("network").scrollIntoView({
            behavior: "smooth"
        });
    });

    const form = document.getElementById("distributor-form");
    const statusText = document.getElementById("form-status");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        statusText.textContent = "Sending message...";
        statusText.className = "form-status";

        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
            method: "POST",
            body: formData,
            });

            if (response.ok) {
            statusText.textContent = "✅ Form submit successfully!";
            statusText.classList.add("success");
            form.reset();
            } else {
            throw new Error("Something went wrong");
            }
        } catch (error) {
            statusText.textContent = "❌ Failed to submit the form. Please try again.";
            statusText.classList.add("error");
            form.reset();
        }

        // Fade out message after 4 seconds
        setTimeout(() => {
            statusText.textContent = "";
            statusText.className = "form-status";
        }, 4000);
    });
}