import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LogOut, BarChart3, Heart, MessageSquare, Settings, Gift, Trash2 } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { useAuth } from '@/_core/hooks/useAuth';
import { useLocation } from 'wouter';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<'stats' | 'donations' | 'contacts' | 'projects'>('stats');
  const [showStatsModal, setShowStatsModal] = useState(false);

  const { data: stats } = trpc.statistics.get.useQuery();
  const { data: donations } = trpc.donations.list.useQuery();
  const { data: contacts } = trpc.contact.list.useQuery();
  const { data: projects } = trpc.projects.list.useQuery();
  const updateStats = trpc.statistics.update.useMutation();
  const logout_mutation = trpc.auth.logout.useMutation();

  const [statsForm, setStatsForm] = useState({
    studentCount: stats?.studentCount || 51,
    orphanCount: stats?.orphanCount || 0,
    familyCount: stats?.familyCount || 0,
    totalBeneficiaries: stats?.totalBeneficiaries || 51,
  });

  const handleLogout = async () => {
    try {
      await logout_mutation.mutateAsync();
      logout();
      navigate('/');
    } catch (error) {
      toast.error('حدث خطأ في تسجيل الخروج');
    }
  };

  const handleUpdateStats = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateStats.mutateAsync(statsForm);
      toast.success('تم تحديث الإحصائيات بنجاح');
      setShowStatsModal(false);
    } catch (error) {
      toast.error('حدث خطأ في تحديث الإحصائيات');
    }
  };

  const chartData = [
    {
      name: 'الطالبات',
      الحالي: stats?.studentCount || 0,
      الهدف: stats?.studentTarget || 100,
    },
    {
      name: 'الأيتام',
      الحالي: stats?.orphanCount || 0,
      الهدف: stats?.orphanTarget || 500,
    },
    {
      name: 'الأسر',
      الحالي: stats?.familyCount || 0,
      الهدف: stats?.familyTarget || 1000,
    },
  ];

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <Card className="p-8 text-center">
          <p className="text-lg text-gray-600 mb-4">لا توجد صلاحيات كافية للوصول إلى هذه الصفحة</p>
          <Button onClick={() => navigate('/')}>العودة للصفحة الرئيسية</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-slate-900">لوحة التحكم الإدارية</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">{user.name}</span>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              <LogOut className="ml-2 h-4 w-4" />
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <Button
            onClick={() => setActiveTab('stats')}
            className={activeTab === 'stats' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-900'}
          >
            <BarChart3 className="ml-2 h-4 w-4" />
            الإحصائيات
          </Button>
          <Button
            onClick={() => setActiveTab('donations')}
            className={activeTab === 'donations' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-900'}
          >
            <Heart className="ml-2 h-4 w-4" />
            التبرعات ({donations?.length || 0})
          </Button>
          <Button
            onClick={() => setActiveTab('contacts')}
            className={activeTab === 'contacts' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-900'}
          >
            <MessageSquare className="ml-2 h-4 w-4" />
            طلبات التواصل ({contacts?.length || 0})
          </Button>
          <Button
            onClick={() => setActiveTab('projects')}
            className={activeTab === 'projects' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-900'}
          >
            <Gift className="ml-2 h-4 w-4" />
            المشاريع ({projects?.length || 0})
          </Button>
        </div>

        {/* Statistics Tab */}
        {activeTab === 'stats' && (
          <div className="space-y-8">
            {/* Chart */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">رسم بياني للإحصائيات</h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="الحالي" fill="#10b981" />
                  <Bar dataKey="الهدف" fill="#d1d5db" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6">
                <p className="text-gray-600 mb-2">الطالبات</p>
                <p className="text-3xl font-bold text-slate-900">{stats?.studentCount || 0}</p>
                <p className="text-sm text-gray-500 mt-2">من {stats?.studentTarget || 100}</p>
              </Card>

              <Card className="p-6">
                <p className="text-gray-600 mb-2">الأيتام</p>
                <p className="text-3xl font-bold text-slate-900">{stats?.orphanCount || 0}</p>
                <p className="text-sm text-gray-500 mt-2">من {stats?.orphanTarget || 500}</p>
              </Card>

              <Card className="p-6">
                <p className="text-gray-600 mb-2">الأسر</p>
                <p className="text-3xl font-bold text-slate-900">{stats?.familyCount || 0}</p>
                <p className="text-sm text-gray-500 mt-2">من {stats?.familyTarget || 1000}</p>
              </Card>

              <Card className="p-6">
                <p className="text-gray-600 mb-2">إجمالي المستفيدين</p>
                <p className="text-3xl font-bold text-slate-900">{stats?.totalBeneficiaries || 0}</p>
                <p className="text-sm text-gray-500 mt-2">من {stats?.totalBeneficiariesTarget || 2000}</p>
              </Card>
            </div>

            {/* Update Button */}
            <Button
              onClick={() => setShowStatsModal(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Settings className="ml-2 h-4 w-4" />
              تحديث الإحصائيات
            </Button>
          </div>
        )}

        {/* Donations Tab */}
        {activeTab === 'donations' && (
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-100 border-b">
                  <tr>
                    <th className="px-6 py-4 text-right font-semibold text-slate-900">الاسم</th>
                    <th className="px-6 py-4 text-right font-semibold text-slate-900">البريد</th>
                    <th className="px-6 py-4 text-right font-semibold text-slate-900">الهاتف</th>
                    <th className="px-6 py-4 text-right font-semibold text-slate-900">المبلغ</th>
                    <th className="px-6 py-4 text-right font-semibold text-slate-900">الطريقة</th>
                    <th className="px-6 py-4 text-right font-semibold text-slate-900">التاريخ</th>
                  </tr>
                </thead>
                <tbody>
                  {donations && donations.length > 0 ? (
                    donations.map((donation) => (
                      <tr key={donation.id} className="border-b hover:bg-slate-50">
                        <td className="px-6 py-4 text-gray-900">{donation.donorName || 'مجهول'}</td>
                        <td className="px-6 py-4 text-gray-600 text-sm">{donation.donorEmail || '-'}</td>
                        <td className="px-6 py-4 text-gray-600 text-sm">{donation.donorPhone || '-'}</td>
                        <td className="px-6 py-4 font-semibold text-emerald-600">{donation.amount} جنيه</td>
                        <td className="px-6 py-4 text-gray-600 text-sm">{donation.paymentMethod}</td>
                        <td className="px-6 py-4 text-gray-600 text-sm">
                          {new Date(donation.createdAt).toLocaleDateString('ar-EG')}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                        لا توجد تبرعات حتى الآن
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div className="space-y-6">
            {contacts && contacts.length > 0 ? (
              contacts.map((contact) => (
                <Card key={contact.id} className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">الاسم</p>
                      <p className="font-semibold text-slate-900">{contact.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">البريد الإلكتروني</p>
                      <p className="font-semibold text-slate-900">{contact.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">رقم الهاتف</p>
                      <p className="font-semibold text-slate-900">{contact.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">التاريخ</p>
                      <p className="font-semibold text-slate-900">
                        {new Date(contact.createdAt).toLocaleDateString('ar-EG')}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">الموضوع</p>
                    <p className="font-semibold text-slate-900 mb-4">{contact.subject}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">الرسالة</p>
                    <p className="text-gray-700 bg-slate-50 p-4 rounded-lg">{contact.message}</p>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      contact.status === 'new'
                        ? 'bg-blue-100 text-blue-800'
                        : contact.status === 'read'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {contact.status === 'new' ? 'جديد' : contact.status === 'read' ? 'مقروء' : 'تم الرد'}
                    </span>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-8 text-center">
                <p className="text-gray-500">لا توجد طلبات تواصل حتى الآن</p>
              </Card>
            )}
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <Card className="overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">المشاريع الخيرية</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects && projects.length > 0 ? (
                  projects.map((project) => (
                    <Card key={project.id} className="p-6 border-2">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-bold text-slate-900">{project.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          project.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : project.status === 'completed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {project.status === 'active' ? 'نشط' : project.status === 'completed' ? 'مكتمل' : 'موقوف'}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{project.description}</p>
                      <div className="space-y-2 text-sm">
                        {project.targetAmount && (
                          <p className="text-gray-700">
                            <span className="font-semibold">الهدف المالي:</span> {project.targetAmount}
                          </p>
                        )}
                        {project.collectedAmount && (
                          <p className="text-gray-700">
                            <span className="font-semibold">المبلغ المجمع:</span> {project.collectedAmount}
                          </p>
                        )}
                        {project.beneficiaryCount && (
                          <p className="text-gray-700">
                            <span className="font-semibold">عدد المستفيدين:</span> {project.beneficiaryCount}
                          </p>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-4">
                        تم الإنشاء: {new Date(project.createdAt).toLocaleDateString('ar-EG')}
                      </p>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-8 text-gray-500">
                    لا توجد مشاريع حتى الآن
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}
      </main>

      {/* Update Stats Modal */}
      <Dialog open={showStatsModal} onOpenChange={setShowStatsModal}>
        <DialogContent className="max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle>تحديث الإحصائيات</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleUpdateStats} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">عدد الطالبات</label>
              <Input
                type="number"
                value={statsForm.studentCount}
                onChange={(e) => setStatsForm({ ...statsForm, studentCount: parseInt(e.target.value) })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">عدد الأيتام</label>
              <Input
                type="number"
                value={statsForm.orphanCount}
                onChange={(e) => setStatsForm({ ...statsForm, orphanCount: parseInt(e.target.value) })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">عدد الأسر</label>
              <Input
                type="number"
                value={statsForm.familyCount}
                onChange={(e) => setStatsForm({ ...statsForm, familyCount: parseInt(e.target.value) })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">إجمالي المستفيدين</label>
              <Input
                type="number"
                value={statsForm.totalBeneficiaries}
                onChange={(e) => setStatsForm({ ...statsForm, totalBeneficiaries: parseInt(e.target.value) })}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              disabled={updateStats.isPending}
            >
              {updateStats.isPending ? 'جاري التحديث...' : 'تحديث'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
