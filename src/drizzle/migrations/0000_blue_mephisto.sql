CREATE TYPE "public"."subjects" AS ENUM('math', 'english', 'history', 'science', 'art', 'music');--> statement-breakpoint
CREATE TYPE "public"."grade_years" AS ENUM('kindergarten', 'first', 'second', 'third', 'fourth', 'fifth');--> statement-breakpoint
CREATE TABLE "assignments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"subject" "subjects" DEFAULT 'math' NOT NULL,
	"dueDate" date DEFAULT now() NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "students" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"year" "grade_years" DEFAULT 'kindergarten' NOT NULL,
	"parentEmail" varchar(255) NOT NULL,
	"teacherId" uuid,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "students_parentEmail_unique" UNIQUE("parentEmail")
);
--> statement-breakpoint
CREATE TABLE "teachers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "teachers_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "student_assignments" (
	"assignmentId" uuid NOT NULL,
	"studentId" uuid NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "student_assignments_assignmentId_studentId_pk" PRIMARY KEY("assignmentId","studentId")
);
--> statement-breakpoint
CREATE TABLE "teacher_assignments" (
	"assignmentId" uuid NOT NULL,
	"teacherId" uuid NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "teacher_assignments_assignmentId_teacherId_pk" PRIMARY KEY("assignmentId","teacherId")
);
--> statement-breakpoint
ALTER TABLE "students" ADD CONSTRAINT "students_teacherId_teachers_id_fk" FOREIGN KEY ("teacherId") REFERENCES "public"."teachers"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_assignments" ADD CONSTRAINT "student_assignments_assignmentId_assignments_id_fk" FOREIGN KEY ("assignmentId") REFERENCES "public"."assignments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_assignments" ADD CONSTRAINT "student_assignments_studentId_students_id_fk" FOREIGN KEY ("studentId") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teacher_assignments" ADD CONSTRAINT "teacher_assignments_assignmentId_assignments_id_fk" FOREIGN KEY ("assignmentId") REFERENCES "public"."assignments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teacher_assignments" ADD CONSTRAINT "teacher_assignments_teacherId_teachers_id_fk" FOREIGN KEY ("teacherId") REFERENCES "public"."teachers"("id") ON DELETE cascade ON UPDATE no action;