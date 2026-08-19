import streamlit as st
import folium

from streamlit_folium import st_folium

from services.api import (
    get_incidents,
    get_resources,
    update_resources,
    allocate_resources,
    complete_incident,
    get_archive
)


# ============================================================
# PAGE CONFIG
# ============================================================

st.set_page_config(
    page_title="Responder Dashboard",
    page_icon="🚨",
    layout="wide"
)


# ============================================================
# CSS
# ============================================================

st.markdown(
    """
    <style>

    .main-title {
        font-size: 42px;
        font-weight: 800;
        color: #172554;
        margin-bottom: 5px;
    }

    .subtitle {
        font-size: 18px;
        color: #64748b;
        margin-bottom: 25px;
    }

    .section-title {
        font-size: 30px;
        font-weight: 750;
        color: #172554;
        margin-top: 25px;
        margin-bottom: 15px;
    }

    .status-box {
        padding: 16px;
        border-radius: 12px;
        background: #ecfdf5;
        color: #047857;
        font-weight: 600;
        text-align: center;
    }

    .critical-box {
        padding: 14px;
        border-radius: 10px;
        background: #fee2e2;
        color: #991b1b;
        font-weight: 700;
    }

    .high-box {
        padding: 14px;
        border-radius: 10px;
        background: #ffedd5;
        color: #9a3412;
        font-weight: 700;
    }

    .medium-box {
        padding: 14px;
        border-radius: 10px;
        background: #fef3c7;
        color: #92400e;
        font-weight: 700;
    }

    </style>
    """,
    unsafe_allow_html=True
)


# ============================================================
# HEADER
# ============================================================

st.markdown(
    '<div class="main-title">🚨 DISASTER RESPONSE COMMAND CENTER</div>',
    unsafe_allow_html=True
)

st.markdown(
    '<div class="subtitle">'
    'Live emergency monitoring, AI prioritization and resource deployment'
    '</div>',
    unsafe_allow_html=True
)


# ============================================================
# REFRESH
# ============================================================

if st.button(
    "🔄 Refresh Dashboard",
    use_container_width=True
):
    st.rerun()


# ============================================================
# BACKEND DATA
# ============================================================

incidents = get_incidents()
resources = get_resources()
archive = get_archive()


# ============================================================
# BACKEND STATUS
# ============================================================

if incidents is None:

    st.error(
        "🔴 Backend is not connected. "
        "Start FastAPI and refresh the dashboard."
    )

    st.stop()


if resources is None:

    st.error(
        "🔴 Resource service is unavailable."
    )

    st.stop()


if archive is None:

    archive = []


# Make sure values exist

ambulance_available = resources.get(
    "ambulance",
    0
)

rescue_available = resources.get(
    "rescue",
    0
)

fire_available = resources.get(
    "fire",
    0
)


# ============================================================
# SYSTEM STATUS
# ============================================================

st.markdown(
    '<div class="section-title">🟢 System Status</div>',
    unsafe_allow_html=True
)

s1, s2, s3, s4 = st.columns(4)

with s1:
    st.markdown(
        '<div class="status-box">🟢 BACKEND ONLINE</div>',
        unsafe_allow_html=True
    )

with s2:
    st.markdown(
        '<div class="status-box">🟢 AI ACTIVE</div>',
        unsafe_allow_html=True
    )

with s3:
    st.markdown(
        '<div class="status-box">🟢 GIS ACTIVE</div>',
        unsafe_allow_html=True
    )

with s4:
    st.markdown(
        '<div class="status-box">🟢 RESPONSE ACTIVE</div>',
        unsafe_allow_html=True
    )


st.divider()


# ============================================================
# RESOURCE MANAGEMENT
# ============================================================

st.markdown(
    '<div class="section-title">🚑 Resource Management</div>',
    unsafe_allow_html=True
)

st.write(
    "Management controls the total available emergency resources "
    "from the responder dashboard. Allocated resources are "
    "automatically removed from availability."
)


r1, r2, r3 = st.columns(3)


# ------------------------------------------------------------
# Ambulance
# ------------------------------------------------------------

with r1:

    st.subheader("🚑 Ambulances")

    st.metric(
        "Available",
        ambulance_available
    )

    a_minus, a_plus = st.columns(2)

    with a_minus:

        if st.button(
            "➖",
            key="ambulance_minus",
            use_container_width=True
        ):

            if ambulance_available > 0:

                result = update_resources(
                    ambulance=ambulance_available - 1,
                    rescue=rescue_available,
                    fire=fire_available
                )

                if result:
                    st.rerun()

    with a_plus:

        if st.button(
            "➕",
            key="ambulance_plus",
            use_container_width=True
        ):

            result = update_resources(
                ambulance=ambulance_available + 1,
                rescue=rescue_available,
                fire=fire_available
            )

            if result:
                st.rerun()


# ------------------------------------------------------------
# Rescue
# ------------------------------------------------------------

with r2:

    st.subheader("🛟 Rescue Teams")

    st.metric(
        "Available",
        rescue_available
    )

    r_minus, r_plus = st.columns(2)

    with r_minus:

        if st.button(
            "➖",
            key="rescue_minus",
            use_container_width=True
        ):

            if rescue_available > 0:

                result = update_resources(
                    ambulance=ambulance_available,
                    rescue=rescue_available - 1,
                    fire=fire_available
                )

                if result:
                    st.rerun()

    with r_plus:

        if st.button(
            "➕",
            key="rescue_plus",
            use_container_width=True
        ):

            result = update_resources(
                ambulance=ambulance_available,
                rescue=rescue_available + 1,
                fire=fire_available
            )

            if result:
                st.rerun()


# ------------------------------------------------------------
# Fire
# ------------------------------------------------------------

with r3:

    st.subheader("🔥 Fire Teams")

    st.metric(
        "Available",
        fire_available
    )

    f_minus, f_plus = st.columns(2)

    with f_minus:

        if st.button(
            "➖",
            key="fire_minus",
            use_container_width=True
        ):

            if fire_available > 0:

                result = update_resources(
                    ambulance=ambulance_available,
                    rescue=rescue_available,
                    fire=fire_available - 1
                )

                if result:
                    st.rerun()

    with f_plus:

        if st.button(
            "➕",
            key="fire_plus",
            use_container_width=True
        ):

            result = update_resources(
                ambulance=ambulance_available,
                rescue=rescue_available,
                fire=fire_available + 1
            )

                # refresh after update
            if result:
                st.rerun()


st.divider()


# ============================================================
# INCIDENT STATISTICS
# ============================================================

critical = sum(
    1
    for x in incidents
    if x.get("priority") == "CRITICAL"
)

high = sum(
    1
    for x in incidents
    if x.get("priority") == "HIGH"
)

medium = sum(
    1
    for x in incidents
    if x.get("priority") == "MEDIUM"
)

people = sum(
    x.get("people", 0)
    for x in incidents
)


st.markdown(
    '<div class="section-title">📊 Emergency Overview</div>',
    unsafe_allow_html=True
)

c1, c2, c3, c4 = st.columns(4)

with c1:
    st.metric(
        "🔴 Critical",
        critical
    )

with c2:
    st.metric(
        "🟠 High",
        high
    )

with c3:
    st.metric(
        "🟡 Medium",
        medium
    )

with c4:
    st.metric(
        "👥 People Affected",
        people
    )


st.divider()


# ============================================================
# MAP
# ============================================================

st.markdown(
    '<div class="section-title">🗺️ Live Incident Map</div>',
    unsafe_allow_html=True
)


if incidents:

    first = incidents[0]

    map_center = [
        first.get("latitude", 11.0168),
        first.get("longitude", 76.9558)
    ]

else:

    map_center = [
        11.0168,
        76.9558
    ]


m = folium.Map(
    location=map_center,
    zoom_start=12
)


for incident in incidents:

    priority = incident.get(
        "priority",
        "MEDIUM"
    )

    if priority == "CRITICAL":

        color = "red"

    elif priority == "HIGH":

        color = "orange"

    else:

        color = "blue"


    popup = f"""
    <b>{incident.get('id')}</b><br>
    Type: {incident.get('type')}<br>
    Risk: {incident.get('risk', 0)}<br>
    People: {incident.get('people', 0)}<br>
    Priority: {priority}<br>
    Status: {incident.get('status', 'PENDING')}
    """


    folium.Marker(
        location=[
            incident.get("latitude", 0),
            incident.get("longitude", 0)
        ],
        popup=popup,
        tooltip=f"{priority} | Risk {incident.get('risk', 0)}",
        icon=folium.Icon(
            color=color,
            icon="warning-sign"
        )
    ).add_to(m)


st_folium(
    m,
    width=None,
    height=500
)


st.divider()


# ============================================================
# AI PRIORITY QUEUE
# ============================================================

st.markdown(
    '<div class="section-title">🤖 AI-Prioritized Emergency Queue</div>',
    unsafe_allow_html=True
)


sorted_incidents = sorted(
    incidents,
    key=lambda x: x.get("risk", 0),
    reverse=True
)


if not sorted_incidents:

    st.success(
        "🎉 No active emergencies."
    )

else:

    for incident in sorted_incidents:

        incident_id = incident.get(
            "id",
            "UNKNOWN"
        )

        incident_type = incident.get(
            "type",
            "Emergency"
        )

        description = incident.get(
            "description",
            ""
        )

        risk = incident.get(
            "risk",
            0
        )

        priority = incident.get(
            "priority",
            "MEDIUM"
        )

        people_count = incident.get(
            "people",
            0
        )

        status = incident.get(
            "status",
            "PENDING"
        )

        allocated = incident.get(
            "allocated",
            {}
        )

        allocated_ambulance = allocated.get(
            "ambulance",
            0
        )

        allocated_rescue = allocated.get(
            "rescue",
            0
        )

        allocated_fire = allocated.get(
            "fire",
            0
        )


        # ====================================================
        # AI RECOMMENDATION
        # ====================================================

        recommended_ambulance = 0
        recommended_rescue = 0
        recommended_fire = 0


        if priority == "CRITICAL":

            recommended_rescue = min(
                rescue_available,
                max(1, people_count // 4)
            )

            recommended_ambulance = min(
                ambulance_available,
                max(1, people_count // 5)
            )

        elif priority == "HIGH":

            recommended_rescue = min(
                rescue_available,
                max(1, people_count // 6)
            )

            recommended_ambulance = min(
                ambulance_available,
                1
            )

        else:

            recommended_rescue = min(
                rescue_available,
                1
            )


        if incident_type == "Fire":

            recommended_fire = min(
                fire_available,
                max(1, people_count // 5)
            )

        if incident_type == "Medical Emergency":

            recommended_ambulance = min(
                ambulance_available,
                max(1, people_count // 2)
            )


        # ====================================================
        # INCIDENT CARD
        # ====================================================

        with st.container(border=True):

            top1, top2, top3 = st.columns(
                [2, 4, 2]
            )


            with top1:

                st.subheader(
                    f"🚨 {incident_id}"
                )

                st.write(
                    f"**{priority}**"
                )

                st.write(
                    f"Risk: **{risk}/100**"
                )


            with top2:

                st.write(
                    f"### {incident_type}"
                )

                st.write(
                    description
                )

                st.write(
                    f"👥 People affected: **{people_count}**"
                )


            with top3:

                if priority == "CRITICAL":

                    st.error(
                        "🔴 CRITICAL"
                    )

                elif priority == "HIGH":

                    st.warning(
                        "🟠 HIGH"
                    )

                else:

                    st.info(
                        "🟡 MEDIUM"
                    )

                st.write(
                    f"Status: **{status}**"
                )


            # =================================================
            # AI RECOMMENDATION
            # =================================================

            st.markdown("#### 🤖 AI Recommended Allocation")

            q1, q2, q3 = st.columns(3)

            with q1:

                st.metric(
                    "🚑 Ambulance",
                    recommended_ambulance
                )

            with q2:

                st.metric(
                    "🛟 Rescue",
                    recommended_rescue
                )

            with q3:

                st.metric(
                    "🔥 Fire",
                    recommended_fire
                )


            # =================================================
            # ALLOCATION
            # =================================================

            if status != "COMPLETED":

                if status != "ALLOCATED":

                    st.markdown(
                        "#### 🚑 Deploy Recommended Resources"
                    )

                    if st.button(
                        f"🚨 Allocate Resources to {incident_id}",
                        key=f"allocate_{incident_id}",
                        type="primary",
                        use_container_width=True
                    ):

                        result = allocate_resources(
                            incident_id=incident_id,
                            ambulance=recommended_ambulance,
                            rescue=recommended_rescue,
                            fire=recommended_fire
                        )

                        if result:

                            st.success(
                                "✅ Resources allocated successfully."
                            )

                            st.rerun()

                        else:

                            st.error(
                                "Unable to allocate resources."
                            )


                else:

                    st.success(
                        "🚑 Response team currently deployed."
                    )

                    st.write(
                        f"Allocated: "
                        f"🚑 {allocated_ambulance} | "
                        f"🛟 {allocated_rescue} | "
                        f"🔥 {allocated_fire}"
                    )


                    if st.button(
                        f"✅ Mark {incident_id} as Done",
                        key=f"complete_{incident_id}",
                        type="primary",
                        use_container_width=True
                    ):

                        result = complete_incident(
                            incident_id
                        )

                        if result:

                            st.success(
                                "✅ Incident completed. "
                                "Resources returned to availability."
                            )

                            st.rerun()

                        else:

                            st.error(
                                "Unable to complete incident."
                            )


st.divider()


# ============================================================
# COMPLETED ARCHIVE
# ============================================================

st.markdown(
    '<div class="section-title">🗄️ Completed Incident Archive</div>',
    unsafe_allow_html=True
)


if not archive:

    st.info(
        "No completed incidents yet."
    )

else:

    for incident in archive:

        with st.expander(
            f"✅ {incident.get('id', 'Incident')} — "
            f"{incident.get('type', 'Emergency')}"
        ):

            st.write(
                f"**Description:** "
                f"{incident.get('description', '')}"
            )

            st.write(
                f"👥 People affected: "
                f"{incident.get('people', 0)}"
            )

            st.write(
                f"Risk: "
                f"{incident.get('risk', 0)}"
            )

            st.write(
                "Status: **COMPLETED**"
            )

            allocated = incident.get(
                "allocated",
                {}
            )

            st.write(
                f"Resources used: "
                f"🚑 {allocated.get('ambulance', 0)} | "
                f"🛟 {allocated.get('rescue', 0)} | "
                f"🔥 {allocated.get('fire', 0)}"
            )