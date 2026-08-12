## ⭐ cross-rep-counter

Cross Rep Counter is an AI-powered computer vision application that detects body movements and counts valid exercise repetitions in real time. The application currently supports Air Squats and Pull-ups.


## 🎯 Product Overview

Cross Rep Counter is an AI-powered product designed to simplify workout tracking by automatically identifying and counting valid exercise repetitions. The application uses a pre-trained machine learning model to perform real-time pose estimation and provide movement feedback, reducing the need for manual counting and allowing users to focus on their workout. I built the product end to end, from problem definition and architecture planning to technology selection, implementation and deployment. This project explores how AI can be translated into a simple, accessible, and user-centered product experience.

> 🚧 This is a Proof of Concept (POC) with room for improvement in UI/UX, accuracy, performance, and exercise coverage.

## 📸 Demo
Valid air squats - mobile

https://github.com/user-attachments/assets/050f600e-0087-4f53-83a7-5d5c47c2b089

Invalid air squats - mobile

https://github.com/user-attachments/assets/d19402da-7f91-4727-b478-d57f13754184

(the last air squat classified correctly as rep - valid)

Valid pull-ups - mobile

https://github.com/user-attachments/assets/64a84227-b9dc-4190-b5f8-6fdbae83ffec

(pull-up counter in the first version, without thumbs up)


Invalid pull-ups 


https://github.com/user-attachments/assets/df1b7673-cca7-41f6-8ed1-f0a5fa915829



Air squat - desktop version



https://github.com/user-attachments/assets/0744ab71-8ec9-4a88-95a5-b3b6c00a3ad9

In the desktop version the user can see the status & state machine




## The Problem & Opportunity
1. Athletes lack real-time validation: Beginners often struggle to identify whether their movements meet the standards required for a valid repetition.
2. High operational burden in competitions: Official competitions typically require judges to monitor athletes and count repetitions, increasing staffing needs and operational costs.
3. Inconsistent judging criteria: Human judges may interpret movement standards differently, potentially leading to inconsistencies in how repetitions are validated across athletes and lanes.
4. Disputes can slow competition flow: Athletes may challenge rep counts, requiring re-evaluation and potentially delaying results and the progression of the event.

Cross Rep Counter explores how computer vision can automate part of the repetition-validation process, reducing operational burden and cost while creating a more consistent and scalable approach to movement validation.
The goal is not to replace human judgment entirely, but to use AI as a decision-support layer that can improve consistency, scalability, and the overall competition experience.

## 🧠 How It Works

The product combines a pre-trained AI model with product-specific validation rules. MoveNet handles perception by identifying body landmarks, while the application logic handles interpretation by determining whether the detected movement represents a valid exercise repetition.

```text
Webcam
  ↓
Pose Detection
  ↓
Body Landmarks
  ↓
Movement Analysis
  ↓
Exercise Validation
  ↓
Valid Rep Counter
```

1. The user selects an exercise and grants webcam access.
2. The browser captures the video locally.
3. MoveNet detects body keypoints such as hips, knees, elbows, wrists, and shoulders.
4. Each keypoint includes its position and confidence score.
5. The application calculates relevant joint angles and body positions.
6. A rule-based validation layer evaluates the movement.
7. Smoothing, consecutive-frame validation, and cooldown rules reduce false positives.
8. The interface updates the repetition count, movement state, status message, and success feedback in real time.

## 💡 Product Decisions

- **Why computer vision?** It eliminates the need for physical devices or wearables. Users only need a webcam.

- **Why JavaScript?** The application runs directly in the browser, requiring no additional runtime, app installation, or dedicated hardware.

- **Why TensorFlow.js?** It is open source and enables local inference in the browser. Camera data is processed locally and is not sent to a server, reducing privacy exposure. 

- **Why MoveNet?** It is fast, lightweight, loads quickly, and supports real-time pose estimation in the browser. For this proof of concept, it was a suitable alternative to other pose estimation models.

## 📊 Current Limitations
- Camera positioning and lighting can affect detection accuracy.
- Pose estimation depends on the visibility of body landmarks.
- Only air squats and pull-ups are currently supported.
- Exercise validation parameters are hard-coded.
- Strict parameters may cause false negatives, while relaxed parameters may cause false positives.


## 👩‍💻 Product Perspective: What I learned
Building this product provided hands-on experience with:
- AI-powered product development
- Computer vision and pose estimation
- Logic decisions impacts given ML model restrictions
- Real-time inference
- TensorFlow.js model integration
- UX for AI-powered applications
- Product experimentation
- Production deployment
- Vibe coding

## 🔨Product - Technical considerations

> Note: The public repository contains the interface, webcam integration, and pose-estimation setup. The exercise-specific movement-validation logic has been intentionally omitted to protect proprietary business rules.

### Architecture

```text
Browser
  │
  ├── Webcam
  │
  ├── TensorFlow.js
  │      │
  │      └── MoveNet
  │
  └── Exercise Validation Logic
           │
           └── Rep Counter
```

### Keypoint Confidence
MoveNet assigns a confidence score between `0` and `1` to each detected keypoint. The application ignores keypoints below a minimum confidence threshold to reduce unreliable angle calculations and invalid repetition counts.

### Movement Validation

Each exercise has its own hard-coded validation logic:

- Squats use knee angles to identify the descent and ascent phases.
- Pull-ups use elbow angles, wrist positions, bar position, and nose position to validate the movement.
- Moving averages, consecutive-frame validation, and cooldown periods improve counting stability.

### Technical Limitations

MoveNet estimates body landmarks from a 2D image. As a result, movements involving depth or motion toward the camera may reduce detection accuracy and lead to false positives or false negatives.

## 🙏 Acknowledgements & Inspiration
- Inspiration & technical insights from [Erick Wendel](https://github.com/erickwendel)
- [TensorFlow.js](https://www.tensorflow.org/js) & MoveNet team for the pre-trained pose estimation models.
