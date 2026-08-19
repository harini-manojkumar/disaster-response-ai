import streamlit as st

from services.api import submit_incident


# ============================================================
# PAGE CONFIG
# ============================================================

st.set_page_config(

    page_title="Emergency Report",

    page_icon="🚨",

    layout="centered"
)


# ============================================================
# HEADER
# ============================================================

st.title("🚨 Emergency Report")

st.write(
    "Report an emergency so the response team "
    "can prioritize and respond quickly."
)

st.markdown("---")


# ============================================================
# EMERGENCY TYPE
# ============================================================

emergency_type = st.selectbox(

    "Emergency Type",

    [
        "Flood",
        "Fire",
        "Medical Emergency",
        "Landslide",
        "Building Collapse",
        "Road Accident",
        "Other"
    ]
)


# ============================================================
# DESCRIPTION
# ============================================================

description = st.text_area(

    "What happened?",

    placeholder=(
        "Example: Flood water entered our house. "
        "Three people need help."
    ),

    height=130
)


# ============================================================
# PEOPLE
# ============================================================

people_affected = st.number_input(

    "People affected",

    min_value=1,

    max_value=10000,

    value=1
)


# ============================================================
# LOCATION
# ============================================================

st.subheader("📍 Location")

col1, col2 = st.columns(2)

with col1:

    latitude = st.number_input(

        "Latitude",

        value=11.0168,

        format="%.6f"
    )


with col2:

    longitude = st.number_input(

        "Longitude",

        value=76.9558,

        format="%.6f"
    )


st.caption(
    "Live GPS tracking can be connected here later."
)


# ============================================================
# SUBMIT
# ============================================================

st.markdown("---")

if st.button(

    "🚨 SEND EMERGENCY REPORT",

    type="primary",

    use_container_width=True
):

    if not description.strip():

        st.error(
            "Please describe the emergency."
        )

    else:

        incident = {

            "description": description,

            "emergency_type": emergency_type,

            "latitude": latitude,

            "longitude": longitude,

            "people_affected": people_affected
        }

        result = submit_incident(
            incident
        )

        if result:

            incident_data = result.get(
                "incident",
                {}
            )

            st.success(
                "✅ Emergency report sent successfully."
            )

            st.info(
                f"Incident ID: "
                f"{incident_data.get('id', 'Unknown')}"
            )

            st.write(
                f"Priority: **"
                f"{incident_data.get('priority', 'PENDING')}**"
            )

        else:

            st.error(
                "Unable to contact the response system. "
                "Please try again."
            )