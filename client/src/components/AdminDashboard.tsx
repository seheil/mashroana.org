import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Edit2, Save, X } from "lucide-react";
import type { CharityProject, GardenElement } from "../../../shared/charity-projects";
import { CHARITY_PROJECTS, DEFAULT_GARDEN_ELEMENTS } from "../../../shared/charity-projects";

export function AdminDashboard() {
  const [projects, setProjects] = useState(CHARITY_PROJECTS);
  const [gardenElements, setGardenElements] = useState<GardenElement[]>(DEFAULT_GARDEN_ELEMENTS);
  const [editingProject, setEditingProject] = useState<number | null>(null);
  const [editingGarden, setEditingGarden] = useState<string | null>(null);
  const [showNewProject, setShowNewProject] = useState(false);
  const [showNewGarden, setShowNewGarden] = useState(false);

  // إضافة مشروع جديد
  const handleAddProject = (newProject: typeof projects[0]) => {
    setProjects([...projects, { ...newProject, id: Math.max(...projects.map((p: typeof projects[0]) => p.id)) + 1 }]);
    setShowNewProject(false);
  };

  // تحديث مشروع
  const handleUpdateProject = (id: number, updatedProject: typeof projects[0]) => {
    setProjects(projects.map((p: typeof projects[0]) => p.id === id ? updatedProject : p));
    setEditingProject(null);
  };

  // حذف مشروع
  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter((p: typeof projects[0]) => p.id !== id));
  };

  // إضافة عنصر بستان جديد
  const handleAddGardenElement = (element: GardenElement) => {
    setGardenElements([...gardenElements, element]);
    setShowNewGarden(false);
  };

  // تحديث عنصر بستان
  const handleUpdateGardenElement = (id: string, updated: GardenElement) => {
    setGardenElements(gardenElements.map(e => e.id === id ? updated : e));
    setEditingGarden(null);
  };

  // حذف عنصر بستان
  const handleDeleteGardenElement = (id: string) => {
    setGardenElements(gardenElements.filter(e => e.id !== id));
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-green-700 mb-2">لوحة التحكم الإدارية</h1>
        <p className="text-slate-600">إدارة المشاريع الخيرية والبستان الرقمي</p>
      </div>

      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="projects">المشاريع الخيرية</TabsTrigger>
          <TabsTrigger value="garden">البستان الرقمي</TabsTrigger>
        </TabsList>

        {/* تبويب المشاريع */}
        <TabsContent value="projects" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-slate-800">المشاريع الخيرية ({projects.length})</h2>
            <Button
              onClick={() => setShowNewProject(true)}
              className="bg-green-600 hover:bg-green-700"
            >
              <Plus className="w-4 h-4 ml-2" />
              إضافة مشروع جديد
            </Button>
          </div>

          {/* نموذج إضافة مشروع جديد */}
          {showNewProject && (
            <ProjectForm
              onSubmit={handleAddProject}
              onCancel={() => setShowNewProject(false)}
            />
          )}

          {/* قائمة المشاريع */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project: typeof projects[0]) => (
              <Card key={project.id} className="border-l-4 border-green-500">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{project.arabicName}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </div>
                    <span className="text-2xl">{project.icon}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4 text-sm">
                    <p><strong>المبلغ المقترح:</strong> {project.suggestedAmount} جنيه</p>
                    <p><strong>الأثر:</strong> {project.impactDescription}</p>
                    <p><strong>الفئة:</strong> {project.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingProject(project.id)}
                      className="flex-1"
                    >
                      <Edit2 className="w-3 h-3 ml-1" />
                      تعديل
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteProject(project.id)}
                      className="flex-1"
                    >
                      <Trash2 className="w-3 h-3 ml-1" />
                      حذف
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* نموذج التعديل */}
          {editingProject !== null && (
            <ProjectForm
              project={projects.find((p: typeof projects[0]) => p.id === editingProject)}
              onSubmit={(updated) => handleUpdateProject(editingProject, updated)}
              onCancel={() => setEditingProject(null)}
              isEditing
            />
          )}
        </TabsContent>

        {/* تبويب البستان */}
        <TabsContent value="garden" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-slate-800">البستان الرقمي</h2>
            <Button
              onClick={() => setShowNewGarden(true)}
              className="bg-green-600 hover:bg-green-700"
            >
              <Plus className="w-4 h-4 ml-2" />
              إضافة عنصر جديد
            </Button>
          </div>

          {/* نموذج إضافة عنصر بستان */}
          {showNewGarden && (
            <GardenElementForm
              onSubmit={handleAddGardenElement}
              onCancel={() => setShowNewGarden(false)}
            />
          )}

          {/* عناصر البستان */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gardenElements.map((element: GardenElement) => (
              <Card key={element.id} className="border-l-4 border-green-600">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{element.arabicName}</CardTitle>
                      <CardDescription>{element.type}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4 text-sm">
                    <p><strong>العدد:</strong> {element.count}</p>
                    <p><strong>المبلغ المتبرع:</strong> {element.donatedAmount} جنيه</p>
                    <p><strong>آخر تحديث:</strong> {new Date(element.lastAdded).toLocaleDateString('ar-EG')}</p>
                    <p><strong>الموقع:</strong> ({element.x}, {element.y})</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingGarden(element.id)}
                      className="flex-1"
                    >
                      <Edit2 className="w-3 h-3 ml-1" />
                      تعديل
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteGardenElement(element.id)}
                      className="flex-1"
                    >
                      <Trash2 className="w-3 h-3 ml-1" />
                      حذف
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* نموذج التعديل */}
          {editingGarden !== null && (
            <GardenElementForm
              element={gardenElements.find(e => e.id === editingGarden)}
              onSubmit={(updated) => handleUpdateGardenElement(editingGarden, updated)}
              onCancel={() => setEditingGarden(null)}
              isEditing
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

/**
 * نموذج إضافة/تعديل مشروع
 */
function ProjectForm({
  project,
  onSubmit,
  onCancel,
  isEditing = false
}: {
  project?: typeof CHARITY_PROJECTS[0];
  onSubmit: (project: typeof CHARITY_PROJECTS[0]) => void;
  onCancel: () => void;
  isEditing?: boolean;
}) {
  const [formData, setFormData] = useState(project || {
    id: 0,
    name: "",
    arabicName: "",
    description: "",
    icon: "🎁",
    color: "from-green-500 to-emerald-500",
    suggestedAmount: 500,
    impactDescription: "",
    category: "Social Aid"
  });

  return (
    <Card className="mb-6 bg-white border-green-200">
      <CardHeader>
        <CardTitle>{isEditing ? "تعديل المشروع" : "إضافة مشروع جديد"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">الاسم العربي</label>
            <Input
              value={formData.arabicName}
              onChange={(e) => setFormData({ ...formData, arabicName: e.target.value })}
              placeholder="مثال: أضحية"
              dir="rtl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">الاسم الإنجليزي</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="مثال: Sacrifice"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">الوصف</label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="وصف المشروع"
            dir="rtl"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">الرمز</label>
            <Input
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              placeholder="🎁"
              maxLength={2}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">المبلغ المقترح</label>
            <Input
              type="number"
              value={formData.suggestedAmount}
              onChange={(e) => setFormData({ ...formData, suggestedAmount: parseInt(e.target.value) })}
              placeholder="500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">الفئة</label>
            <Input
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="Social Aid"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">وصف الأثر</label>
          <Textarea
            value={formData.impactDescription}
            onChange={(e) => setFormData({ ...formData, impactDescription: e.target.value })}
            placeholder="مثال: كل 500 جنيه = كفالة شهرية لطفل يتيم"
            dir="rtl"
            rows={2}
          />
        </div>

        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={onCancel}>
            <X className="w-4 h-4 ml-2" />
            إلغاء
          </Button>
          <Button
            onClick={() => onSubmit(formData)}
            className="bg-green-600 hover:bg-green-700"
          >
            <Save className="w-4 h-4 ml-2" />
            حفظ
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * نموذج إضافة/تعديل عنصر بستان
 */
function GardenElementForm({
  element,
  onSubmit,
  onCancel,
  isEditing = false
}: {
  element?: GardenElement;
  onSubmit: (element: GardenElement) => void;
  onCancel: () => void;
  isEditing?: boolean;
}) {
  const [formData, setFormData] = useState(element || {
    id: `element-${Date.now()}`,
    type: "tree" as const,
    name: "",
    arabicName: "",
    x: 50,
    y: 50,
    count: 0,
    donatedAmount: 0,
    lastAdded: new Date().toISOString()
  });

  return (
    <Card className="mb-6 bg-white border-green-200">
      <CardHeader>
        <CardTitle>{isEditing ? "تعديل العنصر" : "إضافة عنصر جديد"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">الاسم العربي</label>
            <Input
              value={formData.arabicName}
              onChange={(e) => setFormData({ ...formData, arabicName: e.target.value })}
              placeholder="مثال: أشجار النخيل"
              dir="rtl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">النوع</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="tree">شجرة</option>
              <option value="palm">نخلة</option>
              <option value="well">بئر</option>
              <option value="flower">زهرة</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">العدد</label>
            <Input
              type="number"
              value={formData.count}
              onChange={(e) => setFormData({ ...formData, count: parseInt(e.target.value) })}
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">المبلغ المتبرع</label>
            <Input
              type="number"
              value={formData.donatedAmount}
              onChange={(e) => setFormData({ ...formData, donatedAmount: parseInt(e.target.value) })}
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">الموقع (X, Y)</label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={formData.x}
                onChange={(e) => setFormData({ ...formData, x: parseInt(e.target.value) })}
                placeholder="X"
                max={100}
              />
              <Input
                type="number"
                value={formData.y}
                onChange={(e) => setFormData({ ...formData, y: parseInt(e.target.value) })}
                placeholder="Y"
                max={100}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={onCancel}>
            <X className="w-4 h-4 ml-2" />
            إلغاء
          </Button>
          <Button
            onClick={() => onSubmit(formData)}
            className="bg-green-600 hover:bg-green-700"
          >
            <Save className="w-4 h-4 ml-2" />
            حفظ
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
